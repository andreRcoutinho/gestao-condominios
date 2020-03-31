import { BaseEntity } from 'typeorm';
import { Typology } from './typology';
import { Revenue } from './revenue';

export class Unit extends BaseEntity {

    private id: Number;
    private unit: String;
    private typology: Typology; // one to one
    private revenues: Revenue[]; // one to many

    constructor() {
        super();
    }

}