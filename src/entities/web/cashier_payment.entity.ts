import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { Cashier } from './cashier.entity';
import { PaymentMethod } from './payment_method.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CashierPayment extends AuditMixin {
  constructor(partial?: Partial<CashierPayment>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Cashier)
  @ApiProperty({ type: () => Cashier })
  cashier: Cashier;

  @ManyToOne(() => PaymentMethod)
  @ApiProperty({ type: () => PaymentMethod })
  payment_method: PaymentMethod;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  start_range: number;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  end_range: number;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  value: number;
}
