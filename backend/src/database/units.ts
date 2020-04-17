import { Unit } from '../models/unit';
import { Typology } from '../models/typology';

const units_descriptions: String[] =
    [
        '1º Dto',
        '1º Esq',
        '2º Dto',
        '3º Dto',
        '3º Esq',
        '4º Dto',
        '5º Dto',
        '5º Esq',
        '6º Dto',
        '7º Dto',
        '7º Esq',
        '8º Dto',
        'Loja'
    ]

export async function SeedUnits(): Promise<boolean> {

    try {
        let typology_t4: Typology = await Typology.getRepository().findOne({ where: { typology: "T4" } });
        let typology_t4_duplex: Typology = await Typology.getRepository().findOne({ where: { typology: "T4 Duplex" } });
        let typology_shop: Typology = await Typology.getRepository().findOne({ where: { typology: "Loja" } });

        for (let index = 0; index < units_descriptions.length; index++) {
            let desc: String = units_descriptions[index];
            let unit: Unit;
            if (desc.includes('Dto')) {
                unit = new Unit(desc, typology_t4);
            } else if (desc.includes('Esq')) {
                unit = new Unit(desc, typology_t4_duplex);
            } else {
                unit = new Unit(desc, typology_shop);
            }
            await unit.save();
        }

    } catch (error) {
        console.log(error);
        return false;
    };
    return true;
}

