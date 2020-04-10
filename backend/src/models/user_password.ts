import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

import bcrypt from 'bcryptjs';

@Entity('UserPassword')
export class UserPassword extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: Number;

  @Column({ name: 'password_hash' })
  private password_hash: String;

  @Column({ name: 'password_reset_token', nullable: true })
  private password_reset_token: String;

  @Column({ name: 'password_expire_date', nullable: true })
  private password_expire_date: Date;

  constructor(password_hash: String) {
    super();
    this.password_hash = password_hash;
  }

  public getId(): Number {
    return this.id;
  }

  public setId(id: Number): void {
    this.id = id;
  }

  public getPassword_hash(): String {
    return this.password_hash;
  }

  public setPassword_hash(password_hash: String): void {
    this.password_hash = password_hash;
  }

  public getPassword_reset_token(): String {
    return this.password_reset_token;
  }

  public setPassword_reset_token(password_reset_token: String): void {
    this.password_reset_token = password_reset_token;
  }

  public getPassword_expire_date(): Date {
    return this.password_expire_date;
  }

  public setPassword_expire_date(password_expire_date: Date): void {
    this.password_expire_date = password_expire_date;
  }

  @BeforeInsert()
  hash_password() {
    var salt = bcrypt.genSaltSync(10);
    this.setPassword_hash(
      bcrypt.hashSync(this.getPassword_hash().toString(), salt)
    );
  }

  public update_password(new_password): void {
    var salt = bcrypt.genSaltSync(10);
    this.setPassword_hash(bcrypt.hashSync(new_password.toString(), salt));
  }
}
