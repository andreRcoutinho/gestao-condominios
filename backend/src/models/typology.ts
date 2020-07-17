import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Typology')
export class Typology extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'typology', unique: true })
    private typology: String;

    @Column({ name: "permilage" })
    private permilage: Number

    constructor(typology: String, permilage: Number) {
        super();
        this.typology = typology;
        this.permilage = permilage;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getTypology(): String {
        return this.typology;
    }

    public setTypology(typology: String): void {
        this.typology = typology;
    }

    public getPermilage(): Number {
        return this.permilage;
    }

    public setPermilage(permilage: Number): void {
        this.permilage = permilage;
    }

}