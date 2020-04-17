import { Unit } from '../models/unit';
import { Typology } from '../models/typology';

export async function index() {
    try {
        let units: Unit[] = await Unit.find();
        if (!units)
            throw new Error('Não existem Apartamentos na base de dados.')
        return units;
    } catch (e) {
        return;
    }
}

export async function show(id: number) {
    try {
        let unit: Unit = await Unit.findOne({ where: { id } })
        if (!unit)
            throw new Error('Não existe nenhum Apartamento na base de dados com esse ID')
        return unit;
    } catch (e) {
        return;
    }
}

export async function create(body: any) {
    try {
        let hasUnit: Unit = await Unit.findOne({ where: { unit: body.unit } })
        if (hasUnit)
            throw new Error('Esse Apartamento já se encontra registado na base de dados');
        let typology: Typology = await Typology.findOne({ where: { id: body.typology_id } })
        if (!typology)
            throw new Error('Não existe nenhuma Tipologia na base de dados com esse ID')
        let unit: Unit = new Unit(body.unit, typology);
        await unit.save()
        return unit;
    } catch (e) {
        return;
    }
}

export async function update(body: any, id: number) {
    try {
        let unit: Unit = await Unit.findOne({ where: { id } });
        if (!unit)
            throw new Error('Não existe nenhum Apartamento na base de dados com esse ID');
        if (body.typology_id) {
            let typology: Typology = await Typology.findOne({ where: { id: body.typology_id } });
            if (!typology)
                throw new Error('Não existe nenhuma Tipologia na base de dados com esse ID')
            unit.setTypology(typology);
        }
        if (body.unit)
            unit.setUnit(body.unit);
        await unit.save()
        return unit;
    } catch (e) {
        return;
    }
}

export async function remove(id: number) {
    try {
        let unit: Unit = await Unit.findOne({ where: { id } });
        if (!unit)
            throw new Error('Não existe nenhum Apartamento na base de dados com esse ID')
        await Unit.remove(unit);
        return unit;
    } catch (e) {
        return;
    }
}