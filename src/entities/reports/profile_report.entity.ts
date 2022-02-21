import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from '../audit.mixin.entity';
import { Profile } from '../user/profile.entity';
import { AdminReport } from './admin_report.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProfileReport extends AuditMixin {
  constructor(partial?: Partial<ProfileReport>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Profile)
  @ApiProperty({ type: Profile })
  profile: Profile;

  @ManyToOne(() => AdminReport)
  @ApiProperty({ type: () => AdminReport })
  report: AdminReport;
}