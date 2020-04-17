import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('ServiceType')
export class ServiceType extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'service_type' })
    private service_type: String;

    constructor(service_type: String) {
        super();
        this.service_type = service_type;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getService_type(): String {
        return this.service_type;
    }

    public setService_type(service_type: String): void {
        this.service_type = service_type;
    }

}