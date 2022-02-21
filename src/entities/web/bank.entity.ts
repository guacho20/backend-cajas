import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Bank extends AuditMixin {
  constructor(partial?: Partial<Bank>) {
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
  detail: string;

  @Column({length: 25})
  @ApiProperty()
  code: string;

  @Column({length: 25})
  @ApiProperty()
  abbr: string;
}
