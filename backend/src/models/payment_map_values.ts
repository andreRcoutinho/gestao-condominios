import { BaseEntity } from 'typeorm';
import { PaymentMap } from './payment_map';

export class PaymentMapValues extends BaseEntity {

    private id: Number;
    private value: String;
    private start_date: Date;
    private end_date: Date;
    private reserve_fund: String;
    private payment_map: PaymentMap; //many to one

    constructor() {
        super();
    }

}