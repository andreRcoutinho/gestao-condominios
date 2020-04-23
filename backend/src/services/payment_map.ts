import { PaymentMap } from '../models/payment_map';
import { PaymentMapValues } from '../models/payment_map_values';
import { Unit } from '../models/unit';
import { Revenue } from '../models/revenue';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

export async function index() { }
export async function show(id: Number) { }

export async function create(body: any) {
    try {
        let current_date: Date = new Date();
        let yearly: Boolean = false;

        if (body.is_yearly == true) {
            let hasPaymentMap: PaymentMap[] = await PaymentMap.find({ where: { yearly: body.is_yearly, year: current_date.getFullYear().toString() } });
            if (hasPaymentMap.length >= 1) {
                throw new Error('Já existe um mapa anual criado para o corrente ano');
            }
            yearly = true;
        }

        let units: Unit[] = await Unit.findByIds(body.unit_ids);
        if (units.length === 0) {
            throw new Error('Não existem apartamentos com esses ids.')
        }

        let payment_map: PaymentMap = new PaymentMap(body.name, body.description, yearly, current_date.getFullYear().toString());
        await payment_map.save();

        let payment_map_values: PaymentMapValues = new PaymentMapValues(body.value, new Date(), payment_map);
        await payment_map_values.save();

        if (yearly) {
            for (let i = 0; i < units.length; i++) {
                const unit = units[i];
                for (let k = 0; k < months.length; k++) {
                    let revenue: Revenue = new Revenue(months[k], payment_map, unit);
                    await revenue.save();
                }
            }
        } else {
            for (let i = 0; i < units.length; i++) {
                const unit = units[i];
                let revenue: Revenue = new Revenue('Prestação Unica', payment_map, unit);
                await revenue.save();
            }
        }

        return true;

    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function update(id: Number, body: any) {
    try {
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { id } });
        if (!payment_map) {
            throw new Error('Não existe nenhum Mapa de Pagamento com esse id');
        }

        let payment_map_values: PaymentMapValues[] = await PaymentMapValues.find({ where: { payment_map, end_date: null } });

        payment_map_values[0].setEnd_date(new Date());
        await payment_map_values[0].save();

        let date = new Date();
        date.setDate(date.getDate() + 1)
        let new_payment_map_value = new PaymentMapValues(body.value, date, payment_map);
        await new_payment_map_value.save();

        return true;

    } catch (error) {
        console.log(error);
        return error;
    }
}


// 1º  Verificar se já existe algum mapa anual no corrente ano 
// 2º  Verificar se existem units na base de dados 
// 3º  Criar o mapa 
// 4º  Criar o payment_map_values
// 5º  a) Se for para criar uma mapa anual criar 144 novas entradas nas Revenues
//     Not a) Se não for mapa anual criar X entradas nas Revenues em X é o numero de units assinaladas