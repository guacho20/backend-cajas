import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditAccess } from 'src/entities/audit/audit_access.entity';
import { Audit } from 'src/entities/audit/audit.entity';
import { AuditAction } from 'src/entities/audit/audit_action.entity';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditAccess, Audit, AuditAction])
  ],
  providers: [AuditService],
  exports: [AuditService],
  controllers: [AuditController]
})
export class AuditModule {}
