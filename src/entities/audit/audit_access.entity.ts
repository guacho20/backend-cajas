import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { AuditAction } from './audit_action.entity';

@Entity()
export class AuditAccess {
  constructor(partial?: Partial<AuditAccess>) {
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

  @ManyToOne(() => AuditAction)
  @ApiProperty({ type: () => AuditAction })
  audit_action: AuditAction;

  @Column('timestamp with time zone')
  @ApiProperty()
  audit_date: Date;

  @Column({length: 25})
  @ApiProperty()
  ip: string;

  @Column({length: 50})
  @ApiProperty()
  action: string;
}
