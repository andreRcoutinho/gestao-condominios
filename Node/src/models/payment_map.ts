import { BaseEntity } from 'typeorm';
import { Revenue } from './revenue';
import { PaymentMapValues } from './payment_map_values';

export class PaymentMap extends BaseEntity {

    private id: Number;
    private name: String;
    private description: String;
    private revenue: Revenue; //many to one
    private payment_map_values: PaymentMapValues; //one to many

    constructor() {
        super();
    }

}