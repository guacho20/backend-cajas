import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { CashBox } from './cashbox.entity';
import { Commercial } from './commercial.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CommercialCashbox extends AuditMixin {
  constructor(partial?: Partial<CommercialCashbox>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => CashBox)
  @ApiProperty({ type: () => CashBox })
  cashbox: CashBox;

  @ManyToOne(() => Commercial)
  @ApiProperty({ type: () => Commercial })
  commercial: Commercial;

  @Column({length: 25})
  @ApiProperty()
  abbr: string;
}
