import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    JoinTable,
} from "typeorm";
import { Role } from "./role";
import { Contact } from "./contact";
import { UserPassword } from "./user_password";
import { Unit } from "./unit";

@Entity("User")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    private id: Number;

    @Column({ name: "email" })
    private email: String;

    @Column({ name: "first_name" })
    private first_name: String;

    @Column({ name: "last_name" })
    private last_name: String;

    @Column({ name: "IBAN" })
    private IBAN: String;

    @Column({ name: "NIF" })
    private NIF: String;

    @ManyToOne((type) => Role, { eager: true, cascade: true })
    private role: Role;

    @OneToMany((type) => Contact, (contact) => contact.getUser, { eager: true })
    private contacts: Contact[];

    @OneToOne((type) => UserPassword, { eager: true, cascade: true })
    @JoinColumn()
    private user_password: UserPassword;

    @ManyToMany((type) => Unit)
    @JoinTable()
    private units: Unit[];

    constructor(
        email: String,
        first_name: String,
        last_name: String,
        IBAN: String,
        NIF: String,
        role: Role,
        user_password: UserPassword
    ) {
        super();
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.IBAN = IBAN;
        this.NIF = NIF;
        this.role = role;
        this.user_password = user_password;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public setEmail(email: String): void {
        this.email = email;
    }

    public getEmail(): String {
        return this.email;
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

    public getRole(): Role {
        return this.role;
    }

    public setRole(role: Role): void {
        this.role = role;
    }

    public getContacts(): Contact[] {
        return this.contacts;
    }

    public setContacts(contacts: Contact[]): void {
        this.contacts = contacts;
    }

    public getUser_password(): UserPassword {
        return this.user_password;
    }

    public setUser_password(user_password: UserPassword): void {
        this.user_password = user_password;
    }

    public getUnits(): Unit[] {
        return this.units;
    }

    public setUnits(units: Unit[]): void {
        this.units = units;
    }
}
