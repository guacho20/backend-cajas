import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { City } from './city.entity';
import { BusinessType } from './business_type.entity';
import { State } from './state.entity';
import { AttentionDays } from './attention_days.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Commercial extends AuditMixin {
  constructor(partial?: Partial<Commercial>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => City)
  @ApiProperty({ type: () => City })
  city: City;

  @ManyToOne(() => BusinessType)
  @ApiProperty({ type: () => BusinessType })
  type: BusinessType;

  @ManyToOne(() => State)
  @ApiProperty({ type: () => State })
  state: State;

  @OneToMany(() => AttentionDays, attDays => attDays.commercial)
  @ApiProperty({ type: () => [AttentionDays] })
  attention_days: AttentionDays[];

  @Column({length: 100})
  @ApiProperty()
  name: string;

  @Column({length: 13})
  @ApiProperty()
  ruc: string;

  @Column({length: 100})
  @ApiProperty()
  owner: string;

  @Column({length: 25})
  @ApiProperty()
  email: string;

  @Column({length: 25})
  @ApiProperty()
  phone: string;

  @Column({length: 25})
  @ApiProperty()
  cellphone: string;

  @Column({length: 100})
  @ApiProperty()
  address: string;

  @Column('date')
  @ApiProperty()
  entry_date: Date;

  @Column('date')
  @ApiProperty()
  end_date: Date;

  @Column({length: 25})
  @ApiProperty()
  abbr: string;

  @Column('bytea')
  @ApiProperty()
  photo: string;

  @Column({length: 50})
  @ApiProperty()
  lon: string;

  @Column({length: 50})
  @ApiProperty()
  lat: string;
}
