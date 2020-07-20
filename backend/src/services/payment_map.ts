import { PaymentMap } from '../models/payment_map';
import { PaymentMapValues } from '../models/payment_map_values';
import { Unit } from '../models/unit';
import { Revenue } from '../models/revenue';
import { MoreThan, LessThan } from 'typeorm';
import * as api_errors from '../api/api_errors';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const RESERVE_PERCENTAGE = 0.1;

interface res_payment_map {
    id: Number;
    name: String;
    description: String;
    yearly: Boolean;
    year: String;
    closed: Boolean
}

interface res_revenues {
    month: Number;
    unit_id: Number;
    unit: String;
    paid: Boolean;
    value: Number
}

export async function index(year?: String) {
    try {
        let payment_maps_aux: PaymentMap[];
        if (year !== null) {
            payment_maps_aux = await PaymentMap.find({
                where: {
                    year,
                },
            });
        } else {
            payment_maps_aux = await PaymentMap.find();
        }

        if (payment_maps_aux.length === 0) {
            throw new Error(api_errors.NO_PAYMENT_MAPS);
        }

        let payment_maps: res_payment_map[] = [];

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

        let revenues_res: res_revenues[] = [];

        let all_paid = true;
        let total: number = 0;

        for (let i = 0; i < revenues.length; i++) {
            const revenue = revenues[i];

            var value: Number = Number(revenue.getValue());
            revenues_res.push({
                month: revenue.getMonth(),
                unit_id: revenue.getUnit().getId(),
                unit: revenue.getUnit().getUnit(),
                paid: revenue.isPaid(),
                value: Number(value.toFixed(2)),
            });

            if (revenues[i].isPaid() === false) {
                all_paid = false;
            }
            total += Number(revenue.getValue());
        }

        total = Number(total.toFixed(2));
        let response = {
            payment_map: payment_map,
            payment_map_values: payment_map_values,
            total,
            revenues: revenues_res,
            all_paid,
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

        let revenues_res: res_revenues[] = [];

        let all_paid = true;
        let total: number = 0;
        for (let i = 0; i < revenues.length; i++) {
            const revenue = revenues[i];

            var value: Number = Number(revenue.getValue());
            revenues_res.push({
                month: revenue.getMonth(),
                unit_id: revenue.getUnit().getId(),
                unit: revenue.getUnit().getUnit(),
                paid: revenue.isPaid(),
                value: Number(value.toFixed(2)),
            });

            if (revenues[i].isPaid() === false) {
                all_paid = false;
            }

            total += Number(revenue.getValue());
        }


        total = Number(total.toFixed(2));
        let response = {
            payment_map: payment_map,
            payment_map_values: payment_map_values,
            total: total,
            revenues: revenues_res,
            all_paid
        };

        return response;
    } catch (error) {
        return error;
    }
}

async function createNormalPaymentMap(units: Unit[], total_value: Number, payment_map: PaymentMap, installments: Number, isSimulation: Boolean): Promise<Boolean | {}> {
    try {

        let sum_permilage: number = calculateTotalPermilages(units);
        let simulation_values: Revenue[] = [];
        for (let i = 0; i < units.length; i++) {
            let value: Number = 0;
            value = Number(units[i].getTypology().getPermilage().toString()) / sum_permilage;
            value = Number(value) * (Number(total_value) / Number(installments));
            for (let j = 0; j < installments; j++) {
                let revenue: Revenue = new Revenue(0, payment_map, units[i], Number(value), false);
                if (isSimulation) {
                    simulation_values.push(revenue);
                } else {
                    await revenue.save();
                }
            }
        }

        if (isSimulation) {
            return { simulation_values }
        }
        return true;
    } catch (error) {
        return false;
    }
}

async function createPaymentMap(units_month: Unit[], total_value: Number, payment_map: PaymentMap, isSimulation: Boolean): Promise<Boolean | {}> {
    try {
        let reserve_funds: { id: Number; reserve_fund: Number }[] = [];
        let monthly_expenses: { id: Number; monthy_expense: Number }[] = [];

        //Calculate total permilage (Para as frações que entram na mensalidade) 
        let total_permilage_monthly: number = calculateTotalPermilages(units_month);

        //Calculate total permilage (Todas as frações)
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
            await saveMapRevenues(reserve_funds, monthly_expenses, payment_map, all_units);
        }

        return true;
    } catch (error) {
        return false;
    }
}

export async function create(body: any) {
    try {
        let yearly: Boolean = false;

        if (body.is_yearly == true) {
            let hasPaymentMap: PaymentMap[] = await PaymentMap.find({ where: { yearly: body.is_yearly, year: body.year } });
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
            let payment_map_values: PaymentMapValues = new PaymentMapValues(body.value, new Date(new Date().getFullYear() + '-01'), payment_map, body.value * RESERVE_PERCENTAGE);
            await payment_map_values.save();
            await createPaymentMap(units, body.value, payment_map, false);
        } else {
            let payment_map_values: PaymentMapValues = new PaymentMapValues(body.value, new Date(), payment_map, 0);
            await payment_map_values.save();
            await createNormalPaymentMap(units, body.value, payment_map, (body.installments ? body.installments : 1), false);
        }

        return true;
    } catch (error) {
        return error;
    }
}

export async function closePaymentMap(id: Number) {
    try {
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { id } });
        if (!payment_map) {
            throw new Error(api_errors.PAYMENT_MAP_NOT_EXISTS);
        }

        let revenues: Revenue[] = await Revenue.find({ where: { payment_map } });
        for (let i = 0; i < revenues.length; i++) {
            if (revenues[i].isPaid() === false) {
                throw new Error(api_errors.PAYMENT_MAP_INCOMPLETE);
            }
        }

        payment_map.setClosed(true);
        payment_map.save();

        return true;
    } catch (error) {
        return error;
    }
}

export async function updateUsingSimulate(id: Number, body: any) {
    try {
        //vai buscar o mapa 
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { id } });
        if (!payment_map) {
            throw new Error(api_errors.PAYMENT_MAP_NOT_EXISTS);
        }

        //vai buscar o payment_map_values atual (irá servir para fechar mais tarde)
        let payment_map_values: PaymentMapValues[] = await PaymentMapValues.find({
            where: { payment_map: payment_map, end_date: null },
        });

        // Serve para definir a data de validade do valor anterior
        let month = body.month - 1;

        //Fechar o mapa
        payment_map_values[0].setEnd_date(new Date(new Date().getFullYear() + '-' + month));
        await payment_map_values[0].save();

        let date = new Date(new Date().getFullYear() + '-' + body.month);
        let new_payment_map_value = new PaymentMapValues(
            body.value,
            date,
            payment_map,
            body.value * RESERVE_PERCENTAGE
        );
        await new_payment_map_value.save();

        // Vai buscar todas as revenues daquele payment_map, com um mês maior que o anterior ao recebido, e que ainda não foram pagas
        let revenues: Revenue[] = await Revenue.find({
            where: { payment_map: payment_map, month: MoreThan(month) },
        });

        // Serve para identificar as revenues que entram na mensalidade
        let units_monthly: Unit[] = [];
        let units_ids: Number[] = [];
        for (let i = 0; i < revenues.length; i++) {
            let unit: Unit = revenues[i].getUnit();
            if (revenues[i].isMonthly() == true) {
                if (!findUnit(units_monthly, unit)) {
                    units_monthly.push(unit);
                    units_ids.push(unit.getId());
                }
            }
        }

        let new_body = {
            unit_ids: units_ids,
            name: "simulate",
            description: "simulate",
            year: "0000",
            value: body.value
        }
        let sim = await simulate(new_body);

        for (let i = 0; i < revenues.length; i++) {
            const revenue = revenues[i];
            let unit_id = revenue.getUnit().getId();
            let reserve_fund = 0;
            let monthly_expense = 0;
            for (let i = 0; i < sim.reserve_funds.length; i++) {
                if (sim.reserve_funds[i].id == unit_id) {
                    reserve_fund = sim.reserve_funds[i].reserve_fund;
                }
            }
            for (let i = 0; i < sim.monthly_expenses.length; i++) {
                if (sim.monthly_expenses[i].id == unit_id) {
                    monthly_expense = sim.monthly_expenses[i].monthy_expense;
                }
            }

            let value = 0;
            value = reserve_fund + monthly_expense;

            let aux_revenue: Revenue = await Revenue.findOne({ where: { payment_map, month: 1, unit: revenue.getUnit() } });
            let paid_revenues: number = Number(aux_revenue.getValue()) * month;
            let total_simulated: number = value * 12;
            let unpaid_revenues: number = value * (12 - month);

            let total: number = paid_revenues + unpaid_revenues;
            let difference_value: number = total_simulated - total;
            let individual_value: number = difference_value / (12 - month);

            revenue.setValue(value + individual_value);
            revenue.setPaid(false);
            await revenue.save();
        }
        return true;
    } catch (error) {
        return error;
    }
}

export async function updateNormalPaymentMap(id: Number, body: any) {
    try {
        let payment_map: PaymentMap = await PaymentMap.findOne({ where: { id } });
        if (!payment_map) {
            throw new Error(api_errors.PAYMENT_MAP_NOT_EXISTS);
        }

        let payment_map_values: PaymentMapValues[] = await PaymentMapValues.find({ where: { payment_map, end_date: null } });
        let actual_payment_map_values: PaymentMapValues = payment_map_values[0];

        let revenues: Revenue[] = await Revenue.find({ where: { payment_map } });
        if (revenues.length == 0) {
            throw new Error(api_errors.NO_REVENUE_REGISTERED);
        }

        let units: Unit[] = [];
        let unit_ids: Number[] = [];
        for (let i = 0; i < revenues.length; i++) {
            let unit: Unit = revenues[i].getUnit();
            if (!findUnit(units, unit)) {
                units.push(unit);
                unit_ids.push(unit.getId());
            }
        }

        let installments: number = (revenues.length / units.length);

        let aux_sim = {
            installments,
            unit_ids,
            value: actual_payment_map_values.getValue(),
            name: "simulation",
            description: "simulation",
            year: "0000"
        }

        let simulation: {} = await simulate(aux_sim, true);

        for (let i = 0; i < revenues.length; i++) {
            const revenue = revenues[i];
            for (let k = 0; k < simulation["simulation_values"].length; k++) {
                const simulation_value = simulation["simulation_values"][k];
                if (revenue.getUnit().getId() == simulation_value.getUnit().getId()) {
                    revenue.setValue(simulation_value.getValue());
                    revenue.setPaid(false);
                    await revenue.save();
                }
            }
        }

    } catch (error) {
        return error;
    }
}

export async function simulate(body: any, normalPaymentMap?: boolean) {
    try {
        let units: Unit[] = await Unit.findByIds(body.unit_ids);
        if (units.length == 0) {
            throw new Error(api_errors.UNIT_NOT_EXISTS);
        }

        let payment_map: PaymentMap = new PaymentMap(body.name, body.description, true, body.year);

        let res: {} | Boolean;

        if (normalPaymentMap) {
            res = await createNormalPaymentMap(units, body.value, payment_map, body.installments, true);
        } else {
            res = await createPaymentMap(units, body.value, payment_map, true);
        }


        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/***************************
 *  Auxiliar functions
 ***************************/

function findUnit(units: Unit[], unit: Unit) {
    for (let i = 0; i < units.length; i++) {
        if (units[i].getId() === unit.getId()) {
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

function calculateMonthlyExpenses(units: Unit[], total_permilage_month: number, total_value: number, months?: number): { id: Number; monthy_expense: Number }[] {
    let monthly_expenses: { id: Number; monthy_expense: Number }[] = [];

    for (let i = 0; i < units.length; i++) {
        let monthly_expense = 0;
        monthly_expense = Number(units[i].getTypology().getPermilage()) / total_permilage_month;
        monthly_expense = monthly_expense * (Number(total_value) / (months ? months : 12));
        monthly_expenses.push({
            id: units[i].getId(),
            monthy_expense: Number(monthly_expense),
        });
    }

    return monthly_expenses;
}

function calculateReserveFunds(units: Unit[], total_permilage: number, total_value: number, months?: number): { id: Number; reserve_fund: Number }[] {
    let reserve_funds: { id: Number; reserve_fund: Number }[] = [];

    for (let i = 0; i < units.length; i++) {
        let reserve_fund = 0;
        reserve_fund = Number(units[i].getTypology().getPermilage()) / total_permilage;
        reserve_fund = reserve_fund * ((Number(total_value) * RESERVE_PERCENTAGE) / (months ? months : 12));
        reserve_funds.push({
            id: units[i].getId(),
            reserve_fund: Number(reserve_fund)
        });
    }

    return reserve_funds;
}

async function saveMapRevenues(reserve_funds: { id: Number; reserve_fund: Number }[], monthly_expenses: { id: Number; monthy_expense: Number }[], payment_map: PaymentMap, units: Unit[]) {

    for (let i = 0; i < reserve_funds.length; i++) {
        let monthly_expense = 0;
        let monthly = false;

        for (let k = 0; k < monthly_expenses.length; k++) {
            if (reserve_funds[i].id == monthly_expenses[k].id) {
                monthly_expense = Number(monthly_expenses[k].monthy_expense);
                monthly = true;
            }
        }

        for (let j = 0; j < months.length; j++) {
            let value: Number = Number(reserve_funds[i].reserve_fund) + monthly_expense;
            let revenue: Revenue = new Revenue(months[j], payment_map, units[i], Number(value), monthly);
            await revenue.save();
        }
    }

}