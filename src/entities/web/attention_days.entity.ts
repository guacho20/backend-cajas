import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { Days } from './days.entity';
import { Commercial } from './commercial.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AttentionDays extends AuditMixin {
  constructor(partial?: Partial<AttentionDays>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Commercial, commercial => commercial.attention_days)
  @ApiProperty({ type: () => Commercial })
  commercial: Commercial;

  @ManyToOne(() => Days)
  @ApiProperty({ type: () => Days })
  days: Days;

  @Column('time')
  @ApiProperty()
  start_time: string;

  @Column('time')
  @ApiProperty()
  end_time: string;
}
