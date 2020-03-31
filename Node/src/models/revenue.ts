import { BaseEntity } from 'typeorm';
import { Unit } from './unit';
import { PaymentMap } from './payment_map';

export class Revenue extends BaseEntity {

    private id: Number;
    private month: String;
    private payment_date: Date;
    private is_paid: Boolean;
    private unit: Unit; //many to one
    private payment_map: PaymentMap; //one to many

    constructor() {
        super();
    }

}