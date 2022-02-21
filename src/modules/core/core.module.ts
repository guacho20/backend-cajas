import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/entities/core/module.entity';
import { Option } from 'src/entities/core/option.entity';
import { OptionProfile } from 'src/entities/core/option_profile.entity';
import { Params } from 'src/entities/core/params.entity';
import { EmailServer } from 'src/entities/core/email_server.entity';
import { CoreController } from './core.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminModule, Option, OptionProfile, Params, EmailServer]),
  ],
  controllers: [CoreController]
})
export class CoreModule {}
