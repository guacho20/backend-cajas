import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { Department } from './department.entity';
import { State } from './state.entity';
import { Cashier } from './cashier.entity';
import { CashBox } from './cashbox.entity';
import { Commercial } from './commercial.entity';
import { Bank } from './bank.entity';
import { PaymentMethod } from './payment_method.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Charges extends AuditMixin {
  constructor(partial?: Partial<Charges>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Department)
  @ApiProperty({ type: () => Department })
  department: Department;

  @ManyToOne(() => State)
  @ApiProperty({ type: () => State })
  state: State;

  @ManyToOne(() => Cashier)
  @ApiProperty({ type: () => Cashier })
  cashier: Cashier;

  @ManyToOne(() => CashBox)
  @ApiProperty({ type: () => CashBox })
  cashbox: CashBox;

  @ManyToOne(() => Commercial)
  @ApiProperty({ type: () => Commercial })
  commercial: Commercial ;

  @ManyToOne(() => State)
  @ApiProperty({ type: () => State })
  web_state: State;

  @ManyToOne(() => Bank)
  @ApiProperty({ type: () => Bank })
  bank: Bank;

  @ManyToOne(() => PaymentMethod)
  @ApiProperty({ type: () => PaymentMethod })
  payment_method: PaymentMethod;

  @Column('text')
  @ApiProperty()
  detail: string;

  @Column({length: 50})
  @ApiProperty()
  name: string;

  @Column({length: 25})
  @ApiProperty()
  document: string;

  @Column({length: 25})
  @ApiProperty()
  code: string;

  @Column('date')
  @ApiProperty()
  emission_date: Date;

  @Column('date')
  @ApiProperty()
  expiration_date: Date;

  @Column('date')
  @ApiProperty()
  title_date: Date;

  @Column('date')
  @ApiProperty()
  payment_date: Date;

  @Column('time')
  @ApiProperty()
  payment_time: string;

  @Column({length: 25})
  @ApiProperty()
  payment_number: string;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  value: number;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  department_value: number;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  payment_value: number;

  @Column({length: 25})
  @ApiProperty()
  ip_charge: string;

  @Column({length: 25})
  @ApiProperty()
  email: string;

  @Column({length: 25})
  @ApiProperty()
  cellphone: string;
}
