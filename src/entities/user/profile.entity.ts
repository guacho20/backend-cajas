import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { PasswordRules } from './password_rules.entity';
import { OptionProfile } from '../core/option_profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profile extends AuditMixin {
  constructor(partial?: Partial<Profile>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => PasswordRules)
  @ApiProperty({ type: () => PasswordRules })
  password_rules: PasswordRules;

  @Column({length: 25, nullable: false})
  @ApiProperty()
  profile: string;

  @Column({length: 100, nullable: true})
  @ApiProperty()
  detail: string;

  @Column({nullable: true})
  @ApiProperty()
  apply_pass_history: boolean;

  @OneToMany(() => OptionProfile, opt => opt.profile)
  @ApiProperty({ type: () => [OptionProfile] })
  options: OptionProfile[];
}
