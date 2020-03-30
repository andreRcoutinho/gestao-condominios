import { BaseEntity } from 'typeorm';
import { User } from './unit';
import { Supplier } from './supplier';

export class Contact extends BaseEntity {

    private id: Number;
    private phone_number: String;
    private user: User; //many to one
    private supplier: Supplier; //many to one

    constructor() {
        super();
    }

}