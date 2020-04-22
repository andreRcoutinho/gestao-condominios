import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Expense } from './expense';
import { Contact } from './contact';
import { ServiceType } from './service_type';

@Entity('Supplier')
export class Supplier extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'first_name' })
    private first_name: String;

    @Column({ name: 'last_name' })
    private last_name: String;

    @Column({ name: 'company_name' })
    private company_name: String;

    @Column({ name: 'IBAN', nullable: true })
    private IBAN: String;

    @Column({ name: 'NIF', nullable: true })
    private NIF: String;

    @Column({ name: 'email', nullable: true })
    private email: String;

    @OneToMany(type => Expense, expense => expense.getSupplier, { cascade: ["remove"] })
    private expenses: Expense[];

    @OneToMany(type => Contact, contact => contact.getSupplier, { cascade: ["remove"] })
    @JoinColumn()
    private contacts: Contact[];

    @ManyToMany(type => ServiceType, { eager: true })
    @JoinTable()
    private service_types: ServiceType[];

    constructor(first_name: String, last_name: String, company_name: String, email?: String, NIF?: String, IBAN?: String) {
        super();
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.NIF = NIF;
        this.IBAN = IBAN;
        this.company_name = company_name;
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

    public getCompany_name(): String {
        return this.company_name;
    }

    public setCompany_name(company_name: String): void {
        this.company_name = company_name;
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

    public getEmail(): String {
        return this.email;
    }

    public setEmail(Email: String): void {
        this.email = Email;
    }

    public getExpenses(): Expense[] {
        return this.expenses;
    }

    public setExpenses(expenses: Expense[]): void {
        this.expenses = expenses;
    }

    public getContacts(): Contact[] {
        return this.contacts;
    }

    public setContacts(contacts: Contact[]): void {
        this.contacts = contacts;
    }

    public addContact(contact: Contact): void {
        this.contacts.push(contact);
    }

    public getService_types(): ServiceType[] {
        return this.service_types;
    }

    public setService_types(service_type: ServiceType[]): void {
        this.service_types = service_type;
    }

}