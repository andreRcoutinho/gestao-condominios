import { PaymentMap } from '../models/payment_map';
import { PaymentMapValues } from '../models/payment_map_values';
import { Revenue } from '../models/revenue';
import { Unit } from '../models/unit';

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

        let revenue: Revenue = await Revenue.findOne({ where: { payment_map, unit, month: body.month } });
        if (!revenue) {
            throw new Error("Não existe nenhuma receita com esses parametros");
        }
        if (revenue.isPaid()) {
            throw new Error("A mensalidade indicada já se encontra paga.");
        }
        revenue.setPaid(true);
        revenue.setPayment_date(new Date());
        revenue.save();

        return true;
    } catch (error) {
        return error;
    }
}