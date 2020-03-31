import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Role')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'role_name' })
    private role_name: String;

    constructor(role_name: String) {
        super();
        this.role_name = role_name;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getRole_name(): String {
        return this.role_name;
    }

    public setRole_name(role_name: String): void {
        this.role_name = role_name;
    }

}