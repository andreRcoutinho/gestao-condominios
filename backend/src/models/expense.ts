import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Supplier } from './supplier';

@Entity('Expense')
export class Expense extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'value' })
    private value: String;

    @Column({ name: 'description' })
    private description: String;

    @Column({ name: 'payment_date' })
    private payment_date: Date;

    @Column({ name: 'payment_record_date' })
    private payment_record_date: Date;

    @ManyToOne((type) => Supplier, { eager: true })
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

    public getPayment_record_date(): Date {
        return this.payment_record_date;
    }

    public setPayment_record_date(payment_record_date: Date): void {
        this.payment_record_date = payment_record_date;
    }

    public getSupplier(): Supplier {
        return this.supplier;
    }

    public setSupplier(supplier: Supplier): void {
        this.supplier = supplier;
    }
}
