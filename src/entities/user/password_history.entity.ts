import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PasswordHistory {
  constructor(partial?: Partial<PasswordHistory>) {

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => User)
  @ApiProperty({ type: () => User })
  user: User;

  @Column('timestamp with time zone', {nullable: true})
  @ApiProperty()
  audit_datetime: Date;

  @Column({length: 25})
  @ApiProperty()
  ip: string;
}
