import { Typology } from '../models/typology';

async function hasTypology(id: number): Promise<Typology> {
    try {
        let typology: Typology = await Typology.findOne({ where: { id } })
        if (typology)
            return typology;
        return;
    } catch (e) {
        return;
    }
}

export async function index(): Promise<Typology[]> {
    try {
        let typologies: Typology[] = await Typology.find();
        if (typologies)
            return typologies;
        return;
    } catch (e) {
        return;
    }
}

export async function show(id: number): Promise<Typology> {
    try {
        let typology = await hasTypology(id);
        if (!typology) {
            throw new Error('Não existe nenhuma Tipologia na Base de Dados com esse ID.');
        }
        return typology;
    } catch (e) {
        return;
    }
}

export async function create(body: any): Promise<Typology> {
    try {
        let hasTypology: Typology = await Typology.findOne({ where: { typology: body.typology } });
        if (hasTypology)
            throw new Error('Já existe uma Tipologia com esse nome na Base de Dados');

        let typology: Typology = new Typology(body.typology);
        await typology.save();
        return typology;
    } catch (e) {
        return;
    }
}

export async function update(body: any, id: number): Promise<Typology> {
    try {
        if (!hasTypology(id))
            throw new Error('Não existe nenhuma Tipologia na Base de Dados com esse ID.')

        let typology: Typology = await Typology.findOne({ where: { id } });
        typology.setTypology(body.typology);
        await typology.save();
        return typology;
    } catch (e) {
        return;
    }
}

export async function remove(id: number): Promise<Typology> {
    try {
        if (!hasTypology(id))
            throw new Error('Não existe nenhuma Tipologia na Base de Dados com esse ID.')
        let typology: Typology = await Typology.findOne({ where: { id } });
        await Typology.remove(typology);
        return typology;
    } catch (e) {
        return;
    }
}

