import { Typology } from "../models/typology";

export async function SeedTypologies(): Promise<boolean> {

    try {
        var typology_t4: Typology = new Typology('T4', 24);
        await typology_t4.save();
        var typology_t4_duplex: Typology = new Typology('T4 Duplex', 34);
        await typology_t4_duplex.save();
        var typology_shop: Typology = new Typology('Loja', 50);
        await typology_shop.save();

    } catch (error) {
        return false;
    }

    return true;
}