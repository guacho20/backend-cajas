import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import AuditMixin from '../audit.mixin.entity';
import { Profile } from '../user/profile.entity';
import { Option } from './option.entity';

@Entity()
export class OptionProfile extends AuditMixin {
  constructor(partial?: Partial<OptionProfile>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Profile, profile => profile.options, { onDelete: 'RESTRICT' })
  @ApiProperty({ type: () => Profile })
  profile: Profile;

  @ManyToOne(() => Option, { onDelete: 'RESTRICT' })
  @ApiProperty({ type: () => Option })
  option: Option;

  @Column({nullable: true})
  @ApiProperty()
  apply_audit: boolean;
}
