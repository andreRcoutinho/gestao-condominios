import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('User')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'first_name' })
    private first_name: String;

    @Column({ name: 'last_name' })
    private last_name: String;

    @Column({ name: 'IBAN' })
    private IBAN: String;

    @Column({ name: 'NIF' })
    private NIF: String;

    constructor(first_name: String, last_name: String, IBAN: String, NIF: String) {
        super();
        this.first_name = first_name;
        this.last_name = last_name;
        this.IBAN = IBAN;
        this.NIF = NIF;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getFirst_name(): String {
        return this.first_name;
    }

    public setFirst_name(first_name: String): void {
        this.first_name = first_name;
    }

    public getLast_name(): String {
        return this.last_name;
    }

    public setLast_name(last_name: String): void {
        this.last_name = last_name;
    }

    public getIBAN(): String {
        return this.IBAN;
    }

    public setIBAN(IBAN: String): void {
        this.IBAN = IBAN;
    }

    public getNIF(): String {
        return this.NIF;
    }

    public setNIF(NIF: String): void {
        this.NIF = NIF;
    }

}