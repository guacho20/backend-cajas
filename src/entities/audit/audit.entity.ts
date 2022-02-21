import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Option } from '../core/option.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Audit {
  constructor(partial?: Partial<Audit>) {
    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => User)
  @ApiProperty()
  user: User;

  @ManyToOne(() => Option)
  @ApiProperty()
  option: Option;

  @Column('timestamp with time zone')
  @ApiProperty()
  audit_date: Date;

  @Column('text')
  @ApiProperty()
  sql_text: string;

  @Column({length: 100})
  @ApiProperty()
  screen: string;

  @Column({length: 25})
  @ApiProperty()
  ip: string;

  @Column({length: 25})
  @ApiProperty()
  action: string;

  @Column({length: 50})
  @ApiProperty()
  table: string;

  @Column({length: 50})
  @ApiProperty()
  primary: string;
}