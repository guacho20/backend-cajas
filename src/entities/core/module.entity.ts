import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import AuditMixin from '../audit.mixin.entity';
import { Params } from './params.entity';

@Entity()
export class AdminModule extends AuditMixin {
  constructor(partial?: Partial<AdminModule>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({length: 100})
  @ApiProperty()
  detail: string;

  @OneToMany(() => Params, params => params.module)
  @ApiProperty({ type: () => Params })
  params: Params[];
}
