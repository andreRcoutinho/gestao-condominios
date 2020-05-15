import * as api_errors from '../api/api_errors';
import { Supplier } from '../models/supplier';
import { Expense } from '../models/expense';


export async function index() {
    try {
        let expenses: Expense[] = await Expense.find();
        if (expenses.length === 0) {
            throw new Error(api_errors.NO_EXPENSES_REGISTERED)
        }
        return expenses;
    } catch (error) {
        return error;
    }
}

export async function show(id: Number) {
    try {
        let expense: Expense = await Expense.findOne({ where: { id } });
        if (!expense) {
            throw new Error(api_errors.EXPENSE_NOT_EXISTS)
        }
        return expense;
    } catch (error) {
        return error;
    }
}

export async function create(body: any) {
    try {
        let supplier: Supplier = await Supplier.findOne({ where: { id: body.supplier_id } });
        if (!supplier) {
            throw new Error(api_errors.SUPPLIER_NOT_EXISTS)
        }

        let expense: Expense = new Expense(body.value, body.description, body.payment_date, supplier);

        await expense.save();

        return expense;
    } catch (error) {
        return error;
    }
}

export async function update(id: Number, body: any) {
    try {
        let expense: Expense = await Expense.findOne({ where: { id } });
        if (!expense) {
            throw new Error(api_errors.EXPENSE_NOT_EXISTS)
        }
        if (body.supplier_id) {
            let supplier: Supplier = await Supplier.findOne({ where: { id: body.supplier_id } })
            if (!supplier) {
                throw new Error(api_errors.SUPPLIER_NOT_EXISTS);
            }
            expense.setSupplier(supplier);
            delete body.supplier_id;
            await expense.save();
        }
        await Expense.update(Number(expense.getId()), body);

        return expense;

    } catch (error) {
        return error;
    }
}

export async function remove(id: Number) {
    try {
        let expense: Expense = await Expense.findOne({ where: { id } });
        if (!expense) {
            throw new Error(api_errors.EXPENSE_NOT_EXISTS)
        }

        await Expense.remove(expense);
        return true;
    } catch (error) {
        return error;
    }
}