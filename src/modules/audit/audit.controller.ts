import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { getRepository, FindConditions } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/utils';
import { AuditAccess } from 'src/entities/audit/audit_access.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('audit')
export class AuditController {

  /**********************
  **********************
    USERS ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('access')
  async getAllAuditAccess(@Query() query: { qty: number; page:number; sortf: string; order: string }) {
    const accessRepo = getRepository(AuditAccess);
    const qty = query.qty ? query.qty : 5;
    const skip = query.page ? query.page * qty : 0;
    const sortobj = {}
    const findOptions = { relations: ['user', 'audit_action'], skip: skip, take: qty };
    sortobj[query.sortf] = query.order;
    findOptions["order"] = sortobj;
    console.log(findOptions);
    const count = await accessRepo.count();
    const elements = await accessRepo.find(findOptions as FindConditions<AuditAccess>);
    return {
      total: count,
      items: elements
    };
  }
}
