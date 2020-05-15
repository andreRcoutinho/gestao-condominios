import { PaymentMap } from '../models/payment_map';
import { Revenue } from '../models/revenue';
import { Expense } from '../models/expense';
import { Like } from 'typeorm';

export async function monthlyData(month: Number, year: String) {
    try {
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { year, yearly: true } });
        if (!payment_map) {
            throw new Error('Não existe nenhum mapa de pagamento anual para o ano indicado');
        }

        let revenues: Revenue[] = await Revenue.find({ where: { payment_map, month } });
        if (revenues.length === 0) {
            throw new Error('Mês inválido!')
        }

        let total_paid = 0;
        let total_missing = 0;

        for (let i = 0; i < revenues.length; i++) {
            if (revenues[i].isPaid()) {
                total_paid += Number(revenues[i].getValue());
            } else {
                total_missing += Number(revenues[i].getValue());
            }
        }

        let typology_values: { name: String, value: Number }[] = []
        let total_spent = 0;
        let expenses: Expense[] = await Expense.find({ where: { payment_date: Like("") } })

    } catch (error) {
        return error;
    }
}