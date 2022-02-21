import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { User } from './user.entity';
import { PasswordPeriod } from './password_period.entity';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserPassword extends AuditMixin {
  constructor(partial?: Partial<UserPassword>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @OneToOne(() => User, user => user.password)
  @JoinColumn()
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => PasswordPeriod)
  @ApiProperty({ type: () => PasswordPeriod })
  password_period: PasswordPeriod;

  @Column('date', {nullable: true})
  @ApiProperty()
  audit_date: Date;

  @Column('date', {nullable: true})
  @ApiProperty()
  expiration_date: Date;

  @Column({length: 100})
  @ApiProperty()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
