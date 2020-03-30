import { BaseEntity } from 'typeorm';

export class Role extends BaseEntity {

    private id: Number;
    private role_name: String;

    constructor() {
        super();
    }

}