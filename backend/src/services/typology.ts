import { Typology } from '../models/typology';
import * as api_errors from '../api/api_errors';
import { PaymentMap } from '../models/payment_map';
import { Revenue } from '../models/revenue';
import { updatePaymentMap } from '../services/payment_map';
import { Unit } from '../models/unit';
import { MoreThan } from 'typeorm';
import { PaymentMapValues } from '../models/payment_map_values';

async function hasTypology(id: number): Promise<Typology> {
    try {
        let typology: Typology = await Typology.findOne({ where: { id } })
        if (typology)
            return typology;
        return;
    } catch (error) {
        return error;
    }
}

export async function index(): Promise<Typology[]> {
    try {
        let typologies: Typology[] = await Typology.find();
        if (typologies)
            return typologies;
        return;
    } catch (error) {
        return error;
    }
}

export async function show(id: number): Promise<Typology> {
    try {
        let typology = await hasTypology(id);
        if (!typology) {
            throw new Error(api_errors.TYPOLOGY_NOT_EXISTS);
        }
        return typology;
    } catch (error) {
        return error;
    }
}

export async function create(body: any): Promise<Typology> {
    try {
        let hasTypology: Typology = await Typology.findOne({ where: { typology: body.typology } });
        if (hasTypology)
            throw new Error(api_errors.SERVICE_TYPE_ALREADY_EXISTS);

        let typology: Typology = new Typology(body.typology, body.permilage);
        await typology.save();
        return typology;
    } catch (error) {
        return error;
    }
}

export async function update(body: any, id: number): Promise<Typology> {
    try {
        if (! await hasTypology(id))
            throw new Error(api_errors.TYPOLOGY_NOT_EXISTS)

        let hasChangedPermilage: Boolean = false;
        let typology: Typology = await Typology.findOne({ where: { id } });

        if (typology.getTypology() != body.typology) {
            typology.setTypology(body.typology);
        }

        typology.setTypology(body.typology);
        if (typology.getPermilage != body.permilage) {
            typology.setPermilage(body.permilage);
            hasChangedPermilage = true;
        }

        await typology.save();

        //update all payment maps with new permilage
        if (hasChangedPermilage) {
            var paymentMaps: PaymentMap[] = await PaymentMap.find({ where: { closed: false } });

            for (let index = 0; index < paymentMaps.length; index++) {
                var paymentMap: PaymentMap = paymentMaps[index];
                var paymentMapValues: PaymentMapValues[] = await PaymentMapValues.find({ where: { payment_map: paymentMap } });

                let month = new Date().getMonth() + 1;
                let revenues: Revenue[] = await Revenue.find({
                    where: { payment_map: paymentMap, month: MoreThan(month) },
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

                await updatePaymentMap(revenues, paymentMapValues[0].getValue(), units_monthly, month);
            }
        }
        return typology;
    } catch (error) {
        return error;
    }
}

export async function remove(id: number): Promise<Typology> {
    try {
        if (! await hasTypology(id))
            throw new Error(api_errors.TYPOLOGY_NOT_EXISTS)
        let typology: Typology = await Typology.findOne({ where: { id } });
        await Typology.remove(typology);
        return typology;
    } catch (error) {
        return error;
    }
}

export async function importTypologies(body: any): Promise<Typology[]> {
    try {
        var typologies: Typology[] = [];
        for (let index = 0; index < body.length; index++) {
            let typology = body[index];
            var newTypology: Typology = new Typology(typology.typology, typology.permilage);
            typologies.push(newTypology);
        }

        for (let index = 0; index < typologies.length; index++) {
            let typology = typologies[index];
            await typology.save();
        }
        return typologies;
    } catch (error) {
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