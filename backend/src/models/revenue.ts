import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity } from 'typeorm';
import { Unit } from './unit';
import { PaymentMap } from './payment_map';

@Entity('Revenue')
export class Revenue extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'month' })
    private month: String;

    @Column({ name: 'payment_date' })
    private payment_date: Date;

    @Column({ name: 'paid' })
    private paid: Boolean;

    @ManyToOne(type => Unit, { eager: true })
    private units: Unit[];

    @OneToMany(type => PaymentMap, payment_map => payment_map.getRevenue)
    private payment_map: PaymentMap;

    constructor() {
        super();
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getMonth(): String {
        return this.month;
    }

    public setMonth(month: String): void {
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

    public getUnits(): Unit[] {
        return this.units;
    }

    public setUnits(units: Unit[]): void {
        this.units = units;
    }

    public getPayment_map(): PaymentMap {
        return this.payment_map;
    }

    public setPayment_map(payment_map: PaymentMap): void {
        this.payment_map = payment_map;
    }

}