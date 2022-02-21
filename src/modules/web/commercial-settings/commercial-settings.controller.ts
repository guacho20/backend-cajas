import { Controller, Get, Param, Post, Put, Body, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { AuditService } from 'src/modules/audit/audit.service';
import { Roles, IDParam } from 'src/utils';
import { PaymentMethod } from 'src/entities/web/payment_method.entity';
import { BusinessType } from 'src/entities/web/business_type.entity';
import { CashBox } from 'src/entities/web/cashbox.entity';
import { Department } from 'src/entities/web/department.entity';
import { Bank } from 'src/entities/web/bank.entity';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('commercial-settings')
export class CommercialSettingsController {

  constructor(private audit: AuditService) {}

  /**********************
  **********************
    PAYMENT METHODS ENDPOINTS
  **********************
  ***********************/

  @Get('methods')
  async getMethods() {
    const pmRepo = getRepository(PaymentMethod);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver métodos de pago');
    return await pmRepo.find();
  }

  @Get('method/:id')
  async getMethod(@Param() params: IDParam) {
    const pmRepo = getRepository(PaymentMethod);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver método de pago');
    return await pmRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('method')
  async createMethod(@Body() body: PaymentMethod) {
    const pmRepo = getRepository(PaymentMethod);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear método de pago');
    return await pmRepo.save(body);
  }

  @Roles('admin')
  @Put('method')
  async editMethod(@Body() body: PaymentMethod) {
    const pmRepo = getRepository(PaymentMethod);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar método de pago');
    return await pmRepo.save(body);
  }

  @Roles('admin')
  @Delete('method/:id')
  async deleteMethod(@Param() params: IDParam) {
    const pmRepo = getRepository(PaymentMethod);
    const pm = await pmRepo.findOne(params.id)
    if (pm) {
      return await pmRepo.remove(pm);
    }
    throw new NotFoundException('¡El método no existe!');
  }

  /**********************
  **********************
    BUSINESS TYPES ENDPOINTS
  **********************
  ***********************/

  @Get('bstypes')
  async getBSTypes() {
    const bstRepo = getRepository(BusinessType);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver tipos de negocio');
    return await bstRepo.find();
  }

  @Get('bstype/:id')
  async getBSType(@Param() params: IDParam) {
    const bstRepo = getRepository(BusinessType);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver tipo de negocio');
    return await bstRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('bstype')
  async createBSType(@Body() body: BusinessType) {
    const bstRepo = getRepository(BusinessType);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear tipo de negocio');
    return await bstRepo.save(body);
  }

  @Roles('admin')
  @Put('bstype')
  async editBSType(@Body() body: BusinessType) {
    const bstRepo = getRepository(BusinessType);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar tipo de negocio');
    return await bstRepo.save(body);
  }

  @Roles('admin')
  @Delete('bstype/:id')
  async deleteBSType(@Param() params: IDParam) {
    const bstRepo = getRepository(BusinessType);
    const bst = await bstRepo.findOne(params.id)
    if (bst) {
      return await bstRepo.remove(bst);
    }
    throw new NotFoundException('¡El tipo de negocio no existe!');
  }

  /**********************
  **********************
    CASHBOX ENDPOINTS
  **********************
  ***********************/

  @Get('cashboxes')
  async getCashboxes() {
    const cashRepo = getRepository(CashBox);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cajas');
    return await cashRepo.find();
  }

  @Get('cashbox/:id')
  async getCashbox(@Param() params: IDParam) {
    const cashRepo = getRepository(CashBox);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver caja');
    return await cashRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('cashbox')
  async createCashbox(@Body() body: CashBox) {
    const cashRepo = getRepository(CashBox);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear caja');
    return await cashRepo.save(body);
  }

  @Roles('admin')
  @Put('cashbox')
  async editCashbox(@Body() body: CashBox) {
    const cashRepo = getRepository(CashBox);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar caja');
    return await cashRepo.save(body);
  }

  @Roles('admin')
  @Delete('cashbox/:id')
  async deleteCashbox(@Param() params: IDParam) {
    const cashRepo = getRepository(CashBox);
    const cash = await cashRepo.findOne(params.id)
    if (cash) {
      return await cashRepo.remove(cash);
    }
    throw new NotFoundException('¡La caja no existe!');
  }

  /**********************
  **********************
    DEPARTMENTS ENDPOINTS
  **********************
  ***********************/

  @Get('departments')
  async getDepartments() {
    const dpRepo = getRepository(Department);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver departamentos');
    return await dpRepo.find();
  }

  @Get('department/:id')
  async getDepartment(@Param() params: IDParam) {
    const dpRepo = getRepository(Department);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver departamento');
    return await dpRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('department')
  async createDepartment(@Body() body: Department) {
    const dpRepo = getRepository(Department);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear departamento');
    return await dpRepo.save(body);
  }

  @Roles('admin')
  @Put('department')
  async editDepartment(@Body() body: Department) {
    const dpRepo = getRepository(Department);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar departamento');
    return await dpRepo.save(body);
  }

  @Roles('admin')
  @Delete('department/:id')
  async deleteDepartment(@Param() params: IDParam) {
    const dpRepo = getRepository(Department);
    const dp = await dpRepo.findOne(params.id)
    if (dp) {
      return await dpRepo.remove(dp);
    }
    throw new NotFoundException('¡El departamento no existe!');
  }

  /**********************
  **********************
    BANKS ENDPOINTS
  **********************
  ***********************/

  @Get('banks')
  async getBanks() {
    const bankRepo = getRepository(Bank);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver bancos');
    return await bankRepo.find();
  }

  @Get('bank/:id')
  async getBank(@Param() params: IDParam) {
    const bankRepo = getRepository(Bank);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver banco');
    return await bankRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('bank')
  async createBank(@Body() body: Bank) {
    const bankRepo = getRepository(Bank);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear banco');
    return await bankRepo.save(body);
  }

  @Roles('admin')
  @Put('bank')
  async editBank(@Body() body: Bank) {
    const bankRepo = getRepository(Bank);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar banco');
    return await bankRepo.save(body);
  }

  @Roles('admin')
  @Delete('bank/:id')
  async deleteBank(@Param() params: IDParam) {
    const bankRepo = getRepository(Bank);
    const dp = await bankRepo.findOne(params.id)
    if (dp) {
      return await bankRepo.remove(dp);
    }
    throw new NotFoundException('¡El banco no existe!');
  }
}
