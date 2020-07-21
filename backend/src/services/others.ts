import { PaymentMap } from '../models/payment_map';
import { Revenue } from '../models/revenue';
import { Expense } from '../models/expense';
import { Between } from 'typeorm';
import * as api_errors from '../api/api_errors';

export async function monthlyData(month: Number, year: String) {
    try {
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { year, yearly: true } });
        if (!payment_map) {
            throw new Error(api_errors.ANNUAL_PAYMENT_MAP_NOT_EXISTS);
        }

        let revenues: Revenue[] = await Revenue.find({ where: { payment_map, month } });
        if (revenues.length === 0) {
            throw new Error(api_errors.INVALID_MONTH);
        }

        let total_paid = 0;
        let total_missing = 0;
        let missing_payment_unit = [];

        for (let i = 0; i < revenues.length; i++) {
            if (revenues[i].isPaid()) {
                total_paid += Number(revenues[i].getValue());
            } else {
                total_missing += Number(revenues[i].getValue());
                missing_payment_unit.push(revenues[i].getUnit().getUnit());
            }
        }

        let typology_values: { name: String; value: Number }[] = [];
        for (let i = 0; i < revenues.length; i++) {
            if (!existsTypologyName(typology_values, revenues[i].getUnit().getTypology().getTypology())) {
                let value: Number = Number(revenues[i].getValue());
                typology_values.push({
                    name: revenues[i].getUnit().getTypology().getTypology(),
                    value: Number(value.toFixed(2)),
                });
            }
        }

        let total_spent = 0;
        let expenses: Expense[];
        if (month == 12) {
            expenses = await Expense.find({
                where: {
                    expense_date: Between(
                        new Date(`${year}-${month}-01`),
                        new Date(`${year}-${Number(month)}-31`)
                    ),
                },
            });
        } else {
            expenses = await Expense.find({
                where: {
                    expense_date: Between(
                        new Date(`${year}-${month}-01`),
                        new Date(`${year}-${Number(month) + 1}-01`)
                    ),
                },
            });
        }

        for (let i = 0; i < expenses.length; i++) {
            total_spent += Number(expenses[i].getValue());
        }

        //round
        total_paid = Number(total_paid.toFixed(2));
        total_missing = Number(total_missing.toFixed(2));
        total_spent = Number(total_spent.toFixed(2));

        let res = {
            total_missing,
            total_paid,
            total_spent,
            typology_values,
            missing_payment_unit,
        };

        return res;
    } catch (error) {
        return error;
    }
}

function existsTypologyName(typology_values: { name: String; value: Number }[], name: String): boolean {
    for (let i = 0; i < typology_values.length; i++) {
        if (typology_values[i].name === name) {
            return true;
        }
    }
    return false;
}
