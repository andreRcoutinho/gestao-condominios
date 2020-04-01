import {Entity ,BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Typology')
export class Typology extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'typology' })
    private typology: String;

    constructor() {
        super();
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

}