import { Unit } from '../models/unit';
import { Typology } from '../models/typology';
import * as api_errors from '../api/api_errors';
import { Revenue } from '../models/revenue';


export async function index() {
    try {
        let units: Unit[] = await Unit.find();
        if (!units)
            throw new Error(api_errors.UNITS_EMPTY)
        return units;
    } catch (error) {
        return error;
    }
}

export async function show(id: number) {
    try {
        let unit: Unit = await Unit.findOne({ where: { id } })
        if (!unit)
            throw new Error(api_errors.UNIT_NOT_EXISTS)
        return unit;
    } catch (error) {
        return error;
    }
}

export async function create(body: any) {
    try {
        let hasUnit: Unit = await Unit.findOne({ where: { unit: body.unit } })

        if (hasUnit)
            throw new Error(api_errors.UNIT_ALREADY_EXISTS);

        let typology: Typology = await Typology.findOne({ where: { id: body.typology_id } })

        if (!typology)
            throw new Error(api_errors.TYPOLOGY_NOT_EXISTS)

        let unit: Unit = new Unit(body.unit, typology);
        await unit.save();

        return unit;
    } catch (error) {
        return error;
    }
}

export async function update(body: any, id: number) {
    try {
        let unit: Unit = await Unit.findOne({ where: { id } });
        if (!unit)
            throw new Error(api_errors.UNIT_NOT_EXISTS);
        if (body.typology_id) {
            let typology: Typology = await Typology.findOne({ where: { id: body.typology_id } });
            if (!typology)
                throw new Error(api_errors.TYPOLOGY_NOT_EXISTS)
            unit.setTypology(typology);
        }
        if (body.unit)
            unit.setUnit(body.unit);
        await unit.save()
        return unit;
    } catch (error) {
        return error;
    }
}

export async function remove(id: number) {
    try {
        let unit: Unit = await Unit.findOne({ where: { id } });

        if (!unit)
            throw new Error(api_errors.UNIT_NOT_EXISTS)

        let revenues: Revenue[] = await Revenue.find({ where: { unit } });

        if (revenues.length > 0) {
            throw new Error(api_errors.UNIT_CANNOT_BE_REMOVED);
        }

        await Unit.remove(unit);
        return unit;

    } catch (error) {
        return error;
    }
}

export async function importUnits(body: any): Promise<Unit[]> {
    try {
        var units: Unit[] = [];
        for (let index = 0; index < body.length; index++) {
            let unit = body[index];
            let typology: Typology = await Typology.getRepository().findOne({ where: { typology: unit.typology } });
            var newUnit: Unit = new Unit(unit.unit, typology);
            await newUnit.save();
            units.push(newUnit);
        }
        return units;
    } catch (error) {
        return error;
    }
}