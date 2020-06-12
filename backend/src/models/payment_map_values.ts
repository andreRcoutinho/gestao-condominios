import {
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	Entity,
	OneToMany,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { PaymentMap } from './payment_map';

@Entity('PaymentMapValues')
export class PaymentMapValues extends BaseEntity {
	@PrimaryGeneratedColumn({ name: 'id' })
	private id: Number;

	@Column({ name: 'value', type: 'decimal' })
	private value: Number;

	@Column({ name: 'start_date' })
	private start_date: Date;

	@Column({ name: 'end_date', nullable: true })
	private end_date: Date;

	@Column({ name: 'reserve_fund', type: 'decimal' })
	private reserve_fund: Number;

	@ManyToOne((type) => PaymentMap)
	@JoinColumn()
	private payment_map: PaymentMap;

	constructor(value: Number, start_date: Date, payment_map: PaymentMap, reserve_fund: Number) {
		super();
		this.value = value;
		this.start_date = start_date;
		this.payment_map = payment_map;
		this.reserve_fund = reserve_fund;
	}

	public getId(): Number {
		return this.id;
	}

	public setId(id: Number): void {
		this.id = id;
	}

	public getValue(): Number {
		return this.value;
	}

	public setValue(value: Number): void {
		this.value = value;
	}

	public getStart_date(): Date {
		return this.start_date;
	}

	public setStart_date(start_date: Date): void {
		this.start_date = start_date;
	}

	public getEnd_date(): Date {
		return this.end_date;
	}

	public setEnd_date(end_date: Date): void {
		this.end_date = end_date;
	}

	public getreserve_fund(): Number {
		return this.reserve_fund;
	}

	public setreserve_fund(reserve_fund: Number): void {
		this.reserve_fund = reserve_fund;
	}

	public getPayment_map(): PaymentMap {
		return this.payment_map;
	}

	public setPayment_map(payment_map: PaymentMap): void {
		this.payment_map = payment_map;
	}
}
