import { BaseEntity } from 'typeorm';
import { Unit } from './unit';
import { PaymentMap } from './payment_map';

export class Revenue extends BaseEntity {

    private id: Number;
    private month: String;
    private payment_date: Date;
    private is_paid: Boolean;
    private unit: Unit;
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

    public isIs_paid(): Boolean {
        return this.is_paid;
    }

    public setIs_paid(is_paid: Boolean): void {
        this.is_paid = is_paid;
    }

    public getUnit(): Unit {
        return this.unit;
    }

    public setUnit(unit: Unit): void {
        this.unit = unit;
    }

    public getPayment_map(): PaymentMap {
        return this.payment_map;
    }

    public setPayment_map(payment_map: PaymentMap): void {
        this.payment_map = payment_map;
    }

}