import { PaymentMap } from '../models/payment_map';
import { PaymentMapValues } from '../models/payment_map_values';
import { Unit } from '../models/unit';
import { Revenue } from '../models/revenue';
import { MoreThan } from 'typeorm';
import * as api_errors from '../api/api_errors';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export async function index(year?: String) {
    try {
        let payment_maps_aux: PaymentMap[];
        if (year !== null) {
            payment_maps_aux = await PaymentMap.find({
                where: {
                    year,
                    // yearly: false
                },
            });
        } else {
            // payment_maps_aux = await PaymentMap.find({ where: { yearly: false } });
            payment_maps_aux = await PaymentMap.find();
        }

        if (payment_maps_aux.length === 0) {
            throw new Error(api_errors.NO_PAYMENT_MAPS);
        }
        let payment_maps: { id; name; description; yearly; year; closed }[] = [];
        for (let i = 0; i < payment_maps_aux.length; i++) {
            const payment_map = payment_maps_aux[i];
            payment_maps.push({
                id: payment_map.getId(),
                name: payment_map.getName(),
                description: payment_map.getDescription(),
                yearly: payment_map.getYearly(),
                year: payment_map.getYear(),
                closed: payment_map.isClosed(),
            });
        }
        return payment_maps;
    } catch (error) {
        return error;
    }
}

export async function show(id: Number, year?: String) {
    try {
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { id } });
        if (!payment_map) {
            throw new Error(api_errors.PAYMENT_MAP_NOT_EXISTS);
        }

        let payment_map_values: PaymentMapValues[] = await PaymentMapValues.find({
            where: { payment_map },
        });

        let revenues: Revenue[] = await Revenue.find({ where: { payment_map } });

        let revenues_res: { month; unit_id; unit; paid; value }[] = [];

        let all_paid = true;

        for (let i = 0; i < revenues.length; i++) {
            const revenue = revenues[i];

            revenues_res.push({
                month: revenue.getMonth(),
                unit_id: revenue.getUnit().getId(),
                unit: revenue.getUnit().getUnit(),
                paid: revenue.isPaid(),
                value: revenue.getValue(),
            });

            if (revenues[i].isPaid() === false) {
                all_paid = false;
            }
        }

        let response = {
            payment_map: payment_map,
            payment_map_values: payment_map_values,
            revenues: revenues_res,
            all_paid
        };

        return response;
    } catch (error) {
        return error;
    }
}

export async function getAnualPaymentMap(year?: String) {
    try {
        let payment_map: PaymentMap;
        if (year !== null) {
            payment_map = await PaymentMap.findOne({ where: { yearly: true, year } });
        } else {
            let year: number = new Date().getFullYear();
            payment_map = await PaymentMap.findOne({ where: { yearly: true, year } });
        }

        if (!payment_map) {
            throw new Error(api_errors.PAYMENT_MAP_NOT_EXISTS);
        }

        let payment_map_values: PaymentMapValues[] = await PaymentMapValues.find({
            where: { payment_map },
        });

        let revenues: Revenue[] = await Revenue.find({ where: { payment_map } });

        let revenues_res: { month; unit_id; unit; paid; value }[] = [];

        for (let i = 0; i < revenues.length; i++) {
            const revenue = revenues[i];
            revenues_res.push({
                month: revenue.getMonth(),
                unit_id: revenue.getUnit().getId(),
                unit: revenue.getUnit().getUnit(),
                paid: revenue.isPaid(),
                value: revenue.getValue(),
            });
        }

        let response = {
            payment_map: payment_map,
            payment_map_values: payment_map_values,
            revenues: revenues_res,
        };

        return response;
    } catch (error) {
        return error;
    }
}

/* CREATE REVENUES NORMAL PAYMENT MAP */
async function createNormalPaymentMap(units: Unit[], total_value: Number, payment_map: PaymentMap, installments: Number): Promise<Boolean> {
    try {
        let sum_permilage = 0;
        for (let i = 0; i < units.length; i++) {
            sum_permilage += Number(units[i].getTypology().getPermilage());
        }

        for (let i = 0; i < units.length; i++) {
            let value: Number;
            value = Number(units[i].getTypology().getPermilage().toString()) / sum_permilage;
            value = Number(value) * (Number(total_value) / Number(installments));
            for (let j = 0; j < installments; j++) {
                let revenue: Revenue = new Revenue(0, payment_map, units[i], Number(value.toFixed(2)), false);
                await revenue.save();
            }
        }
        return true;
    } catch (error) {
        return false;
    }
}

async function createPaymentMap(units_month: Unit[], total_value: Number, payment_map: PaymentMap, isSimulation: Boolean): Promise<Boolean | {}> {
    try {
        let reserve_funds: { id; reserve_fund }[] = [];
        let monthly_expenses: { id; monthy_expense }[] = [];

        //Calculate total permilage per month
        let total_permilage_monthly: number = calculateTotalPermilages(units_month);

        //Calculate total permilage
        let all_units: Unit[] = await Unit.find();
        let total_permilage: number = calculateTotalPermilages(all_units);

        //Calculate monthly expenses
        monthly_expenses = calculateMonthlyExpenses(units_month, total_permilage_monthly, Number(total_value));

        //Calculate reserve funds
        reserve_funds = calculateReserveFunds(all_units, total_permilage, Number(total_value));

        //Save
        if (isSimulation) {
            return {
                reserve_funds,
                monthly_expenses,
                total_permilage,
                total_permilage_monthly,
            };
        } else {
            await saveMap(reserve_funds, monthly_expenses, payment_map, all_units);
        }

        return true;
    } catch (error) {
        return false;
    }
}

async function updatePaymentMap(
    revenues: Revenue[],
    total_value: Number,
    units_monthly: Unit[]
): Promise<Boolean> {
    try {
        let reserve_funds: { id; reserve_fund }[] = [];
        let monthly_expenses: { id; monthy_expense }[] = [];

        let all_units: Unit[] = await Unit.find();
        let total_permilage: number = calculateTotalPermilages(all_units);

        let total_permilage_monthly: number = calculateTotalPermilages(units_monthly);

        //Calculate monthly expenses
        monthly_expenses = calculateMonthlyExpenses(
            units_monthly,
            total_permilage_monthly,
            Number(total_value)
        );

        //Calculate reserve funds
        reserve_funds = calculateReserveFunds(all_units, total_permilage, Number(total_value));

        await updateRevenues(revenues, monthly_expenses, reserve_funds);

        return true;
    } catch (error) {
        return false;
    }
}

export async function create(body: any) {
    try {
        let yearly: Boolean = false;

        if (body.is_yearly == true) {
            let hasPaymentMap: PaymentMap[] = await PaymentMap.find({
                where: { yearly: body.is_yearly, year: body.year },
            });
            if (hasPaymentMap.length >= 1) {
                throw new Error(api_errors.ANNUAL_PAYMENT_MAP_ALREADY_EXISTS);
            }
            yearly = true;
        }

        let units: Unit[] = await Unit.findByIds(body.unit_ids);
        if (units.length === 0) {
            throw new Error(api_errors.UNIT_NOT_EXISTS);
        }

        let payment_map: PaymentMap = new PaymentMap(body.name, body.description, yearly, body.year);
        await payment_map.save();

        if (yearly) {
            let payment_map_values: PaymentMapValues = new PaymentMapValues(body.value, new Date(new Date().getFullYear() + '-01'), payment_map, body.value * 0.1);
            await payment_map_values.save();
            await createPaymentMap(units, body.value, payment_map, false);
        } else {
            let payment_map_values: PaymentMapValues = new PaymentMapValues(body.value, new Date(), payment_map, 0);
            await payment_map_values.save();
            await createNormalPaymentMap(units, body.value, payment_map, (body.installments ? body.installments : 1));
        }

        return true;
    } catch (error) {
        return error;
    }
}

export async function update(id: Number, body: any) {
    try {
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { id } });
        if (!payment_map) {
            throw new Error(api_errors.PAYMENT_MAP_NOT_EXISTS);
        }

        if (body.month <= 2 && body.month >= 12) {
            throw new Error(api_errors.MONTH_VALUE_INCORRECT);
        }

        let payment_map_values: PaymentMapValues[] = await PaymentMapValues.find({
            where: { payment_map, end_date: null },
        });
        let month = body.month - 1;
        payment_map_values[0].setEnd_date(new Date(new Date().getFullYear() + '-' + month));
        await payment_map_values[0].save();

        let date = new Date(new Date().getFullYear() + '-' + body.month);
        let new_payment_map_value = new PaymentMapValues(
            body.value,
            date,
            payment_map,
            body.value * 0.1
        );
        await new_payment_map_value.save();

        let revenues: Revenue[] = await Revenue.find({
            where: { payment_map: payment_map, month: MoreThan(month) },
        });

        let units_monthly: Unit[] = [];
        for (let i = 0; i < revenues.length; i++) {
            const unit: Unit = revenues[i].getUnit();
            if (revenues[i].isMonthly() === true) {
                if (!findUnit(units_monthly, unit)) {
                    units_monthly.push(unit);
                }
            }
        }
        await updatePaymentMap(revenues, body.value, units_monthly);
        return true;
    } catch (error) {
        return error;
    }
}

export async function closePaymentMap(id: Number) {
    try {
        //Verificar se o mapa existe
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { id } });
        if (!payment_map) {
            throw new Error(api_errors.PAYMENT_MAP_NOT_EXISTS);
        }

        //Verificar se todas as revenues do mapa estão pagas
        let revenues: Revenue[] = await Revenue.find({ where: { payment_map } });
        for (let i = 0; i < revenues.length; i++) {
            if (revenues[i].isPaid() === false) {
                throw new Error(api_errors.PAYMENT_MAP_INCOMPLETE);
            }
        }

        //Fechar o mapa
        payment_map.setClosed(true);
        payment_map.save();
        return true;
    } catch (error) {
        return error;
    }
}

export async function simulate(body: any) {
    try {
        let units: Unit[] = await Unit.findByIds(body.unit_ids);
        if (units.length === 0) {
            throw new Error(api_errors.UNIT_NOT_EXISTS);
        }

        let payment_map: PaymentMap = new PaymentMap(body.name, body.description, true, body.year);

        let res = await createPaymentMap(units, body.value, payment_map, true);

        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

function findUnit(units: Unit[], unit: Unit) {
    for (let i = 0; i < units.length; i++) {
        const element = units[i];
        if (element.getId() === unit.getId()) {
            return true;
        }
    }
    return false;
}

function calculateTotalPermilages(units: Unit[]): number {
    let total_permilage_month: number = 0;
    for (let i = 0; i < units.length; i++) {
        total_permilage_month += Number(units[i].getTypology().getPermilage());
    }
    return total_permilage_month;
}

function calculateMonthlyExpenses(units: Unit[], total_permilage_month: number, total_value: number): { id; monthy_expense }[] {
    let monthly_expenses: { id; monthy_expense }[] = [];
    for (let i = 0; i < units.length; i++) {
        let monthly_expense = 0;
        monthly_expense = Number(units[i].getTypology().getPermilage()) / total_permilage_month;
        monthly_expense = monthly_expense * (Number(total_value) / 12);
        monthly_expenses.push({
            id: units[i].getId(),
            monthy_expense: Number(monthly_expense.toFixed(2)),
        });
    }
    return monthly_expenses;
}

function calculateReserveFunds(units: Unit[], total_permilage: number, total_value: number): { id; reserve_fund }[] {
    let reserve_funds: { id; reserve_fund }[] = [];
    for (let i = 0; i < units.length; i++) {
        let reserve_fund = 0;
        reserve_fund = Number(units[i].getTypology().getPermilage()) / total_permilage;
        reserve_fund = reserve_fund * ((Number(total_value) * 0.1) / 12);
        reserve_funds.push({ id: units[i].getId(), reserve_fund: Number(reserve_fund.toFixed(2)) });
    }
    return reserve_funds;
}

async function saveMap(reserve_funds: { id; reserve_fund }[], monthly_expenses: { id; monthy_expense }[], payment_map: PaymentMap, units: Unit[]) {
    for (let i = 0; i < reserve_funds.length; i++) {
        let monthly_expense = 0;
        let monthly = false;
        for (let k = 0; k < monthly_expenses.length; k++) {
            if (reserve_funds[i].id == monthly_expenses[k].id) {
                monthly_expense = monthly_expenses[k].monthy_expense;
                monthly = true;
            }
        }
        for (let j = 0; j < months.length; j++) {
            let value: Number = reserve_funds[i].reserve_fund + monthly_expense;
            let revenue: Revenue = new Revenue(months[j], payment_map, units[i], Number(value.toFixed(2)), monthly);
            await revenue.save();
        }
    }
}

async function updateRevenues(revenues: Revenue[], monthly_expenses: { id; monthy_expense }[], reserve_funds: { id; reserve_fund }[]) {
    for (let i = 0; i < revenues.length; i++) {
        const revenue = revenues[i];
    }

    for (let i = 0; i < reserve_funds.length; i++) {
        let monthly_expense = 0;
        for (let k = 0; k < monthly_expenses.length; k++) {
            if (reserve_funds[i].id == monthly_expenses[k].id) {
                monthly_expense = monthly_expenses[k].monthy_expense;
            }
        }
        for (let j = 0; j < revenues.length; j++) {
            const revenue = revenues[j];
            if (revenue.getUnit().getId() == reserve_funds[i].id) {
                revenue.setValue(Number(reserve_funds[i].reserve_fund + monthly_expense));
                await revenue.save();
            }
        }
    }
}
