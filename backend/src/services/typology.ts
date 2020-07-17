import { Typology } from '../models/typology';
import * as api_errors from '../api/api_errors';

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

        let typology: Typology = await Typology.findOne({ where: { id } });
        typology.setTypology(body.typology);
        await typology.save();
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

