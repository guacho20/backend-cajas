import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PasswordPeriod extends AuditMixin {
  constructor(partial?: Partial<PasswordPeriod>) {
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

  @Column('int')
  @ApiProperty()
  days_num: number;
}
