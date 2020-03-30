import { BaseEntity } from 'typeorm';

export class Typology extends BaseEntity {

    private id: Number;
    private typology: String;

    constructor() {
        super();
    }

}