import { BaseEntity } from 'typeorm';
import { User } from './user';
import { Supplier } from './supplier';

export class Contact extends BaseEntity {

    private id: Number;
    private phone_number: String;
    private user: User;
    private supplier: Supplier;

    constructor() {
        super();
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getPhone_number(): String {
        return this.phone_number;
    }

    public setPhone_number(phone_number: String): void {
        this.phone_number = phone_number;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getSupplier(): Supplier {
        return this.supplier;
    }

    public setSupplier(supplier: Supplier): void {
        this.supplier = supplier;
    }

}