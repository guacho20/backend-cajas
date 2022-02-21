import { Entity, Column, PrimaryGeneratedColumn, Tree, TreeParent, TreeChildren } from 'typeorm';
import AuditMixin from '../audit.mixin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Tree('closure-table')
export class Option extends AuditMixin {
  constructor(partial?: Partial<Option>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @TreeParent()
  @ApiProperty()
  parent: Option;

  @TreeChildren({cascade: false})
  @ApiProperty()
  children: Option[];

  @Column({length: 100})
  @ApiProperty()
  menu_name: string;

  @Column({length: 100})
  @ApiProperty()
  screen_name: string;
}
