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
        console.log(paymnet_map_values);

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

/**
 * 1º Verificar se existe payment map
 * 2º Verificar se existe apartamento
 * 3º Verificar se existem revenues com o payment map e a unit
 * 4º
 */