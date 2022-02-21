import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Department extends AuditMixin {
  constructor(partial?: Partial<Department>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({length: 100})
  @ApiProperty()
  name: string;

  @Column({length: 100})
  @ApiProperty()
  name_base: string;
}
