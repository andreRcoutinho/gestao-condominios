import { PaymentMap } from '../models/payment_map';
import { PaymentMapValues } from '../models/payment_map_values';
import { Revenue } from '../models/revenue';
import { Unit } from '../models/unit';

export async function index() {
    try {
        let revenues: Revenue[] = await Revenue.find({ where: { paid: true } });
        if (revenues.length === 0) {
            throw new Error('Ainda não existem receitas registadas!');
        }
        let revenues_res: { id, month?, payment_map_id, payment_map_name, unit_id, unit, value, payment_date }[] = [];
        for (let i = 0; i < revenues.length; i++) {
            let revenue = {
                id: revenues[i].getId(),
                month: revenues[i].getMonth(),
                payment_map_id: revenues[i].getPayment_map().getId(),
                payment_map_name: revenues[i].getPayment_map().getName(),
                unit_id: revenues[i].getUnits().getId(),
                unit: revenues[i].getUnits().getUnit(),
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
            throw new Error("Erro mapa de pagamento")
        }

        let unit: Unit = await Unit.findOne({ where: { id: body.unit_id } })
        if (!unit) {
            throw new Error("Erro no apartamento")
        }

        for (let i = 0; i < body.months.length; i++) {
            const month = body.months[i];
            let revenue: Revenue = await Revenue.findOne({ where: { payment_map, unit, month } });
            revenue.setPaid(true);
            revenue.setPayment_date(new Date());
            await revenue.save();
        }

        return true;
    } catch (error) {
        return error;
    }
}