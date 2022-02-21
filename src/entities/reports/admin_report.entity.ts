import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from '../audit.mixin.entity';
import { Option } from '../core/option.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AdminReport extends AuditMixin {
  constructor(partial?: Partial<AdminReport>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Option)
  @ApiProperty({ type: () => Option })
  option: Option;

  @Column({length: 100})
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  path: string;
}