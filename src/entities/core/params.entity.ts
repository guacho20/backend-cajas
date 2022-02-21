import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AdminModule } from './module.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Params {
  constructor(partial?: Partial<Params>) {
    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => AdminModule, module => module.params)
  @ApiProperty({ type: () => AdminModule })
  module: AdminModule;

  @Column({length: 25})
  @ApiProperty()
  name: string;

  @Column({length: 100})
  @ApiProperty()
  detail: string;

  @Column({length: 100})
  @ApiProperty()
  value: string;

  @Column({length: 50, nullable: true})
  @ApiProperty()
  table: string;

  @Column({length: 50})
  @ApiProperty()
  code_field: string;

  @Column({length: 50})
  @ApiProperty()
  detail_field: string;

  @Column()
  @ApiProperty()
  apply_table: boolean;
}