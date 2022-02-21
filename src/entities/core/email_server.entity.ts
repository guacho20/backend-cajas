import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import AuditMixin from '../audit.mixin.entity';

@Entity()
export class EmailServer extends AuditMixin {
  constructor(partial?: Partial<EmailServer>) {
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
  user: string;

  @Column({length: 50})
  @ApiProperty()
  email: string;

  @Column({length: 50})
  @ApiProperty()
  password: string;

  @Column({length: 50})
  @ApiProperty()
  smtp_address: string;

  @Column({length: 100})
  @ApiProperty()
  port: string;
}
