import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminReport } from 'src/entities/reports/admin_report.entity';
import { ProfileReport } from 'src/entities/reports/profile_report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminReport, ProfileReport])
  ]
})
export class ReportsModule {}
