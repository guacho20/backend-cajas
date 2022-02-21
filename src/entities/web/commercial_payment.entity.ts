import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { Bank } from './bank.entity';
import { PaymentMethod } from './payment_method.entity';
import { State } from './state.entity';
import { Commercial } from './commercial.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CommercialPayment extends AuditMixin {
  constructor(partial?: Partial<CommercialPayment>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Bank)
  @ApiProperty({ type: () => Bank })
  bank: Bank;

  @ManyToOne(() => PaymentMethod)
  @ApiProperty({ type: () => PaymentMethod })
  payment_method: PaymentMethod;

  @ManyToOne(() => State)
  @ApiProperty({ type: () => State })
  state: State;

  @ManyToOne(() => Commercial)
  @ApiProperty({ type: () => Commercial })
  commercial: Commercial;

  @Column('date')
  @ApiProperty()
  deposit_date: Date;

  @Column({length: 25})
  @ApiProperty()
  receipt_number: string;

  @Column('bytea')
  @ApiProperty()
  receipt_photo: string;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  value: number;

  @Column('date')
  @ApiProperty()
  active_date: Date;

  @Column({length: 50})
  @ApiProperty()
  active_user: string;

  @Column({length: 25})
  @ApiProperty()
  active_ip: string;

  @Column('text')
  @ApiProperty()
  observation: string;
}
