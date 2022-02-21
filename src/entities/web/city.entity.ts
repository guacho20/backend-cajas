import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { Province } from './province.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class City extends AuditMixin {
  constructor(partial?: Partial<City>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Province, province => province.cities, { onDelete: 'RESTRICT' })
  @ApiProperty({ type: () => Province })
  province: Province;

  @Column({length: 25})
  @ApiProperty()
  detail: string;
}
