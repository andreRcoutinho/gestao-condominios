import { BaseEntity } from 'typeorm';

export class ServiceType extends BaseEntity {

    private id: Number;
    private service_type: String;

    constructor() {
        super();
    }

}