import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AuditAccess } from 'src/entities/audit/audit_access.entity';
import { AuditAction } from 'src/entities/audit/audit_action.entity';
import { UserResponse } from 'src/models/user_response.model';
import { User } from 'src/entities/user/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class AuditService {
  constructor(@Inject(REQUEST) readonly req: Request) {}

  async createAccessAudit(actionName: string, accessAction: string) {
    const auditAccessRepo = getRepository(AuditAccess);
    const auditActionRepo = getRepository(AuditAction);
    const userRepo = getRepository(User);
    const auditLogin = await auditActionRepo.findOne({ where: { name: actionName } });
    if (auditLogin) {
      const access = new AuditAccess();
      access.audit_action = auditLogin;
      access.audit_date = new Date();
      access.ip = this.req.ip;
      access.action = accessAction;
      const userReq = (this.req.user as UserResponse);
      if (userReq) {
        const userEnt = await userRepo.findOne(userReq.id);
        access.user = userEnt;
      }
      await auditAccessRepo.save(access);
    }
  }
}
