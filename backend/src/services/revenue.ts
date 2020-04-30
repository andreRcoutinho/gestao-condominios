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

        let paymnet_map_values: PaymentMapValues[] = await PaymentMapValues.find({ where: { payment_map } })

        let unit: Unit = await Unit.findOne({ where: { id: body.unit_id } })
        if (!unit) {
            throw new Error("Erro no apartamento")
        }

        let revenue: Revenue[] = await Revenue.find({ where: { payment_map, unit } });
        if (revenue.length === 0) {
            throw new Error("Não existe nenhuma receita com esses parametros");
        }


        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}