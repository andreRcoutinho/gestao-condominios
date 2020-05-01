import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity } from 'typeorm';
import { Unit } from './unit';
import { PaymentMap } from './payment_map';

@Entity('Revenue')
export class Revenue extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'month' })
    private month: Number;

    @Column({ name: 'payment_date', nullable: true })
    private payment_date: Date;

    @Column({ name: 'payment_record_date', nullable: true })
    private payment_record_date: Date;

    @Column({ name: 'paid' })
    private paid: Boolean;

    @Column({ name: 'value', type: "decimal" })
    private value: Number;

    @Column({ name: "monthly" })
    private monthly: Boolean;

    @ManyToOne(type => Unit, unit => unit.getRevenues, { eager: true })
    private unit: Unit;

    @ManyToOne(type => PaymentMap, payment_map => payment_map.getRevenue)
    private payment_map: PaymentMap;

    constructor(month: Number, payment_map: PaymentMap, unit: Unit, value: Number, monthly: Boolean) {
        super();
        this.month = month;
        this.payment_map = payment_map;
        this.unit = unit;
        this.paid = false;
        this.value = value;
        this.monthly = monthly;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getMonth(): Number {
        return this.month;
    }

    public setMonth(month: Number): void {
        this.month = month;
    }

    public getPayment_date(): Date {
        return this.payment_date;
    }

    public setPayment_date(payment_date: Date): void {
        this.payment_date = payment_date;
    }

    public isPaid(): Boolean {
        return this.paid;
    }

    public setPaid(paid: Boolean): void {
        this.paid = paid;
    }

    public isMonthly(): Boolean {
        return this.monthly;
    }

    public setMonthly(monthly: Boolean): void {
        this.monthly = monthly;
    }

    public getValue(): Number {
        return this.value;
    }

    public setValue(value: Number): void {
        this.value = value;
    }

    public getUnits(): Unit {
        return this.unit;
    }

    public setUnits(units: Unit): void {
        this.unit = units;
    }

    public getPayment_map(): PaymentMap {
        return this.payment_map;
    }

    public setPayment_map(payment_map: PaymentMap): void {
        this.payment_map = payment_map;
    }

}