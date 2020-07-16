import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity, JoinColumn } from 'typeorm';
import { Supplier } from './supplier';

@Entity('Expense')
export class Expense extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'value', type: "decimal" })
    private value: Number;

    @Column({ name: 'description' })
    private description: String;

    @Column({ name: 'expense_date' })
    private expense_date: Date;

    @Column({ name: 'payment_record_date' })
    private payment_record_date: Date;

    @ManyToOne((type) => Supplier, { eager: true })
    @JoinColumn()
    private supplier: Supplier;

    constructor(value: Number, description: String, expense_date: Date, supplier: Supplier) {
        super();
        this.value = value;
        this.description = description;
        this.expense_date = expense_date;
        this.payment_record_date = new Date();
        this.supplier = supplier;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getValue(): Number {
        return this.value;
    }

    public setValue(value: Number): void {
        this.value = value;
    }

    public getDescription(): String {
        return this.description;
    }

    public setDescription(description: String): void {
        this.description = description;
    }

    public getExpense_date(): Date {
        return this.expense_date;
    }

    public setExpense_date(expense_date: Date): void {
        this.expense_date = expense_date;
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
