import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import AuditMixin from '../audit.mixin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AuditAction extends AuditMixin {
  constructor(partial?: Partial<AuditAction>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({length: 50})
  @ApiProperty()
  name: string;

  @Column({length: 100})
  @ApiProperty()
  detail: string;
}
