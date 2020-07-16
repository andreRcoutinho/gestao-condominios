import { PaymentMap } from '../models/payment_map';
import { Revenue } from '../models/revenue';
import { Unit } from '../models/unit';
import * as api_errors from '../api/api_errors';
import { Between } from 'typeorm';

export async function index(year?: String) {
    try {
        let revenues: Revenue[];
        if (year !== null) {
            revenues = await Revenue.find({
                where: {
                    payment_date: Between(new Date(`${year}-01-01`), new Date(`${year}-12-31`)),
                    paid: true
                }
            })
        } else {
            revenues = await Revenue.find({ where: { paid: true } });
        }

        if (revenues.length === 0) {
            throw new Error(api_errors.NO_REVENUE_REGISTERED);
        }
        let revenues_res: { id, month?, payment_map_id, payment_map_name, unit_id, unit, value, payment_date }[] = [];
        for (let i = 0; i < revenues.length; i++) {
            let revenue = {
                id: revenues[i].getId(),
                month: revenues[i].getMonth(),
                payment_map_id: revenues[i].getPayment_map().getId(),
                payment_map_name: revenues[i].getPayment_map().getName(),
                unit_id: revenues[i].getUnit().getId(),
                unit: revenues[i].getUnit().getUnit(),
                value: revenues[i].getValue(),
                payment_date: revenues[i].getPayment_date()
            }

            revenues_res.push(revenue);
        }

        return revenues_res;
    } catch (error) {
        return error;
    }
}

export async function payment_record(body: any) {
    try {
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { id: body.payment_map_id } });
        if (!payment_map) {
            throw new Error(api_errors.PAYMENT_MAP_NOT_EXISTS)
        }

        let unit: Unit = await Unit.findOne({ where: { id: body.unit_id } })
        if (!unit) {
            throw new Error(api_errors.UNIT_NOT_EXISTS)
        }

        if (payment_map.getYearly() === true) {
            for (let i = 0; i < body.months.length; i++) {
                const month = body.months[i];
                let revenue: Revenue = await Revenue.findOne({ where: { payment_map, unit, month } });
                revenue.setPaid(true);
                revenue.setPayment_date(new Date());
                await revenue.save();
            }
        } else {
            return payment_record_normal_payment_map(payment_map, unit, body.installments_to_pay ? body.installments_to_pay : 1);
        }
        return true;
    } catch (error) {
        return error;
    }
}

async function payment_record_normal_payment_map(payment_map: PaymentMap, unit: Unit, installments_to_pay: Number) {
    try {
        let revenues: Revenue[] = await Revenue.find({ where: { payment_map, unit } });

        if (installments_to_pay > revenues.length) {
            throw new Error("Número de prestações a pagar é maior que as prestações.");
        }

        let unPaidRevenues: Revenue[] = [];

        revenues.forEach(revenue => {
            if (!revenue.isPaid()) {
                unPaidRevenues.push(revenue);
            }
        });

        if (unPaidRevenues.length == 0) {
            throw new Error("Já não existem prestações para pagar!");
        }

        if (unPaidRevenues.length < installments_to_pay) {
            throw new Error("Apenas podem ser pagas " + unPaidRevenues.length + " prestações.");
        }

        for (let i = 0; i < installments_to_pay; i++) {
            unPaidRevenues[i].setPaid(true);
            await unPaidRevenues[i].save();
        }

        return true;
    } catch (error) {
        return error;
    }
}