import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Days extends AuditMixin {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({length: 25})
  @ApiProperty()
  detail: string;
}
