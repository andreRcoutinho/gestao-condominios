import { BaseEntity } from 'typeorm';
import { Supplier } from './supplier';

export class Expense extends BaseEntity {

    private id: Number;
    private value: String;
    private description: String;
    private payment_date: Date;
    private supplier: Supplier; //many to one

    constructor() {
        super();
    }

}