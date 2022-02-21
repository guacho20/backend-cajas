import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Profile } from '../../entities/user/profile.entity';
import { User } from '../../entities/user/user.entity';
import { PasswordRules } from '../../entities/user/password_rules.entity';
import { UserPassword } from '../../entities/user/user_password.entity';
import { PasswordPeriod } from '../../entities/user/password_period.entity';
import { PasswordHistory } from '../../entities/user/password_history.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, PasswordRules, UserPassword, PasswordPeriod, PasswordHistory]),
    AuditModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
