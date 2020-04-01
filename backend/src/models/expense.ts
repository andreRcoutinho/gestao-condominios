import { BaseEntity } from 'typeorm';
import { Supplier } from './supplier';

export class Expense extends BaseEntity {

    private id: Number;
    private value: String;
    private description: String;
    private payment_date: Date;
    private supplier: Supplier;

    constructor() {
        super();
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getValue(): String {
        return this.value;
    }

    public setValue(value: String): void {
        this.value = value;
    }

    public getDescription(): String {
        return this.description;
    }

    public setDescription(description: String): void {
        this.description = description;
    }

    public getPayment_date(): Date {
        return this.payment_date;
    }

    public setPayment_date(payment_date: Date): void {
        this.payment_date = payment_date;
    }

    public getSupplier(): Supplier {
        return this.supplier;
    }

    public setSupplier(supplier: Supplier): void {
        this.supplier = supplier;
    }

}