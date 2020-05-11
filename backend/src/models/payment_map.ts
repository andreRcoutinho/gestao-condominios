import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity, OneToMany } from 'typeorm';
import { Revenue } from './revenue';
import { PaymentMapValues } from './payment_map_values';

@Entity('PaymentMap')
export class PaymentMap extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'name' })
    private name: String;

    @Column({ name: 'description' })
    private description: String;

    @Column({ name: 'record_date' })
    private record_date: Date;

    @Column({ name: "yearly" })
    private yearly: Boolean;

    @Column({ name: "year" })
    private year: String;

    @Column({ name: "closed" })
    private closed: Boolean;

    @OneToMany(type => Revenue, revenue => revenue.getPayment_map)
    private revenue: Revenue[];

    @OneToMany(type => PaymentMapValues, payment_map_values => payment_map_values.getPayment_map)
    private payment_map_values: PaymentMapValues[];

    constructor(name: String, description: String, yearly: Boolean, year: String) {
        super();
        this.name = name;
        this.description = description;
        this.record_date = new Date();
        this.yearly = yearly;
        this.year = year;
        this.closed = false;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getName(): String {
        return this.name;
    }

    public setName(name: String): void {
        this.name = name;
    }

    public getDescription(): String {
        return this.description;
    }

    public setDescription(description: String): void {
        this.description = description;
    }

    public getRecord_date(): Date {
        return this.record_date;
    }

    public setRecord_date(record_date: Date): void {
        this.record_date = record_date;
    }

    public getYearly(): Boolean {
        return this.yearly;
    }

    public setYearly(yearly: Boolean): void {
        this.yearly = yearly;
    }

    public isClosed(): Boolean {
        return this.closed;
    }

    public setClosed(closed: Boolean): void {
        this.closed = closed;
    }

    public getYear(): String {
        return this.year;
    }

    public setYear(year: String): void {
        this.year = year;
    }

    public getRevenue(): Revenue[] {
        return this.revenue;
    }

    public setRevenue(revenue: Revenue[]): void {
        this.revenue = revenue;
    }

    public getPayment_map_values(): PaymentMapValues[] {
        return this.payment_map_values;
    }

    public setPayment_map_values(payment_map_values: PaymentMapValues[]): void {
        this.payment_map_values = payment_map_values;
    }

}