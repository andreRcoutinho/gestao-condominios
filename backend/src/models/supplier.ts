import { BaseEntity } from 'typeorm';
import { Expense } from './expense';
import { Contact } from './contact';
import { ServiceType } from './service_type';

export class Supplier extends BaseEntity {

    private id: Number;
    private first_name: String;
    private last_name: String;
    private company_name: String;
    private IBAN: String;
    private NIF: String;
    private expenses: Expense[]; //one to many
    private contacts: Contact[]; //one to many
    private service_type: ServiceType; //many to many

    constructor() {
        super();
    }

}