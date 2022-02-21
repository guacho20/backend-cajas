import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { PaymentMethod } from './payment_method.entity';
import { Commercial } from './commercial.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Payment extends AuditMixin {
  constructor(partial?: Partial<Payment>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => PaymentMethod)
  @ApiProperty({ type: PaymentMethod })
  payment_method: PaymentMethod;

  @ManyToOne(() => Commercial)
  @ApiProperty({ type: () => Commercial })
  commercial: Commercial;

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
