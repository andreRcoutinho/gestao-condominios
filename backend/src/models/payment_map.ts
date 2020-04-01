import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Revenue } from './revenue';
import { PaymentMapValues } from './payment_map_values';

@Entity('PaymentMap')
export class PaymentMap extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'name' })
    private name: String;

    @Column({ name: 'description' })
    private description: String;

    @ManyToOne(type => Revenue, { eager: true })
    private revenue: Revenue[];

    
    private payment_map_values: PaymentMapValues;

    constructor() {
        super();
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getName(): String {
        return this.name;
    }

    public setName(name: String): void {
        this.name = name;
    }

    public getDescription(): String {
        return this.description;
    }

    public setDescription(description: String): void {
        this.description = description;
    }

    public getRevenue(): Revenue[] {
        return this.revenue;
    }

    public setRevenue(revenue: Revenue[]): void {
        this.revenue = revenue;
    }

}