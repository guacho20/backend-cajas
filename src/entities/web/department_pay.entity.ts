import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { Department } from './department.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DepartmentPay extends AuditMixin {
  constructor(partial?: Partial<DepartmentPay>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Department)
  @ApiProperty({ type: () => Department })
  department: Department;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  start_range: number;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  end_range: number;

  @Column('numeric', {precision: 15, scale: 2})
  @ApiProperty()
  value: number;
}
