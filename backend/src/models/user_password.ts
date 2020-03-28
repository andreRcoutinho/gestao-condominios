import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('UserPassword')
export class UserPassword extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'password_hash' })
    private password_hash: String;

    @Column({ name: 'password_reset_token' })
    private password_reset_token: String;

    @Column({ name: 'password_expire_date' })
    private password_expire_date: Date;

    constructor() {
        super();
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getPassword_hash(): String {
        return this.password_hash;
    }

    public setPassword_hash(password_hash: String): void {
        this.password_hash = password_hash;
    }

    public getPassword_reset_token(): String {
        return this.password_reset_token;
    }

    public setPassword_reset_token(password_reset_token: String): void {
        this.password_reset_token = password_reset_token;
    }

    public getPassword_expire_date(): Date {
        return this.password_expire_date;
    }

    public setPassword_expire_date(password_expire_date: Date): void {
        this.password_expire_date = password_expire_date;
    }


}