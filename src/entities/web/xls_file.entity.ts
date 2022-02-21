import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { State } from './state.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class XlsFile extends AuditMixin {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => State)
  @ApiProperty({ type: () => State })
  state: State;

  @Column({length: 25})
  @ApiProperty()
  doc_number: string;

  @Column({length: 25})
  @ApiProperty()
  document: string;

  @Column({length: 25})
  @ApiProperty()
  name: string;

  @Column({length: 25})
  @ApiProperty()
  email: string;

  @Column({length: 10})
  @ApiProperty()
  phone: string;

  @Column({length: 100})
  @ApiProperty()
  detail: string;

  @Column({length: 100})
  @ApiProperty()
  detail2: string;

  @Column({length: 100})
  @ApiProperty()
  detail3: string;

  @Column({length: 100})
  @ApiProperty()
  detail4: string;

  @Column('date')
  @ApiProperty()
  upload_date: Date;

  @Column('date')
  @ApiProperty()
  emission_date: Date;

  @Column('date')
  @ApiProperty()
  expires_date: Date;

  @Column({length: 25})
  @ApiProperty()
  location_code: string;

  @Column({length: 50})
  @ApiProperty()
  institution: string;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  value: number;
}
