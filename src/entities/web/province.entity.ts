import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { City } from './city.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Province extends AuditMixin {
  constructor(partial?: Partial<Province>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @OneToMany(() => City, cities => cities.province)
  @ApiProperty({ type: () => [City] })
  cities: City[];

  @Column({length: 25})
  @ApiProperty()
  detail: string;
}
