import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { Profile } from './profile.entity';
import { UserPassword } from './user_password.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends AuditMixin {
  constructor(partial?: Partial<User>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ManyToOne(() => Profile)
  @ApiProperty({ type: () => Profile })
  profile: Profile;

  @OneToOne(() => UserPassword, password => password.user)
  @ApiProperty({ type: () => UserPassword })
  password: UserPassword;

  @Column({length: 50})
  @ApiProperty()
  name: string;

  @Column({unique: true})
  @ApiProperty()
  email: string;

  @Column('date', {nullable: true})
  @ApiProperty()
  expiration_date: Date;

  @Column({nullable: true})
  @ApiProperty()
  locked: boolean;

  @Column({nullable: true})
  @ApiProperty()
  password_change: boolean;

  @Column({length: 25})
  @ApiProperty()
  theme: string;

  @Column('bytea', {nullable: true})
  @ApiProperty()
  photo: Buffer;
}
