import { Typology } from "../models/typology";

export async function SeedTypologies(): Promise<boolean> {

    try {
        var typology_t4: Typology = new Typology('T4');
        await typology_t4.save();
        var typology_t4_duplex: Typology = new Typology('T4 Duplex');
        await typology_t4_duplex.save();
        var typology_shop: Typology = new Typology('Loja');
        await typology_shop.save();

    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
}