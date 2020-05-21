import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Typology } from './typology';
import { Revenue } from './revenue';

@Entity('Unit')
export class Unit extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'unit' })
    private unit: String;

    @ManyToOne(type => Typology, { eager: true, cascade: true })
    private typology: Typology;

    @OneToMany(type => Revenue, revenue => revenue.getUnit)
    private revenues: Revenue[];

    constructor(unit: String, typology: Typology) {
        super();
        this.unit = unit;
        this.typology = typology;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getUnit(): String {
        return this.unit;
    }

    public setUnit(unit: String): void {
        this.unit = unit;
    }

    public getTypology(): Typology {
        return this.typology;
    }

    public setTypology(typology: Typology): void {
        this.typology = typology;
    }

    public getRevenues(): Revenue[] {
        return this.revenues;
    }

    public setRevenues(revenues: Revenue[]): void {
        this.revenues = revenues;
    }

}