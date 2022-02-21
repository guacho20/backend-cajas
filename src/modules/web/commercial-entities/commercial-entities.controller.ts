import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { getRepository, FindConditions } from 'typeorm';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { AuditService } from 'src/modules/audit/audit.service';
import {
  Roles,
  IDParam,
  CreateCommercialBody,
  EditCommercialBody,
  CreateAttDayBody,
  EditAttDayBody,
  CreateCommercialCashBoxBody,
  EditCommercialCashBoxBody,
  CreateCashierBody,
  EditCashierBody
} from 'src/utils';
import { Commercial } from 'src/entities/web/commercial.entity';
import { City } from 'src/entities/web/city.entity';
import { BusinessType } from 'src/entities/web/business_type.entity';
import { State } from 'src/entities/web/state.entity';
import { AttentionDays } from 'src/entities/web/attention_days.entity';
import { Days } from 'src/entities/web/days.entity';
import { CommercialCashbox } from 'src/entities/web/commercial_cashbox.entity';
import { CashBox } from 'src/entities/web/cashbox.entity';
import { Cashier } from 'src/entities/web/cashier.entity';
import { IdentityDocument } from 'src/entities/web/id_doc.entity';
import { User } from 'src/entities/user/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('commercial-entities')
export class CommercialEntitiesController {

  constructor(private audit: AuditService) {}

  /**********************
  **********************
    COMMERCIAL ENDPOINTS
  **********************
  ***********************/

  @Get('commercials')
  async getCommercials(@Query() query: { qty: number; page:number; sortf: string; order: string }) {
    const commercialRepo = getRepository(Commercial);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver comercios');
    const qty = query.qty ? query.qty : 5;
    const skip = query.page ? query.page * qty : 0;
    let sortobj = {}
    const findOptions = { select: ['name', 'ruc', 'email', 'owner', 'phone', 'cellphone'], skip: skip, take: qty };
    sortobj[query.sortf] = query.order;
    findOptions["order"] = sortobj;
    const count = await commercialRepo.count();
    const elements = await commercialRepo.find(findOptions as FindConditions<Commercial>);
    return {
      total_count: count,
      commercials: elements
    };
  }

  @Get('commercial/:id')
  async getCommercial(@Param() params: IDParam) {
    const commercialRepo = getRepository(Commercial);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver comercio');
    return await commercialRepo.findOne(params.id, { relations: ["city", "type", "state", "attention_days"] });
  }

  @Roles('admin')
  @Post('commercial')
  async createCommercial(@Body() body: CreateCommercialBody) {
    const commercialRepo = getRepository(Commercial);
    const cityRepo = getRepository(City);
    const bstRepo = getRepository(BusinessType);
    const stateRepo = getRepository(State);

    const commercial = new Commercial(body.commercial);

    const city = await cityRepo.findOne(body.city_id);
    commercial.city = city;

    const bst = await bstRepo.findOne(body.type_id);
    commercial.type = bst;

    if (body.state_id) {
      const state = await stateRepo.findOne(body.state_id);
      commercial.state = state;
    }
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear comercio');
    return await commercialRepo.save(commercial);
  }

  @Roles('admin')
  @Put('commercial')
  async editCommercial(@Body() body: EditCommercialBody) {
    const commercialRepo = getRepository(Commercial);
    const cityRepo = getRepository(City);
    const bstRepo = getRepository(BusinessType);
    const stateRepo = getRepository(State);

    const commercial = new Commercial(body.commercial);

    if (body.city_id) {
      const city = await cityRepo.findOne(body.city_id);
      commercial.city = city;
    }

    if (body.type_id) {
      const type = await bstRepo.findOne(body.type_id);
      commercial.type = type;
    }

    if (body.state_id) {
      const state = await stateRepo.findOne(body.state_id);
      commercial.state = state;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar comercio');
    return await commercialRepo.save(commercial);
  }

  @Roles('admin')
  @Delete('commercial/:id')
  async deleteCommercial(@Param() params: IDParam) {
    const commercialRepo = getRepository(Commercial);
    const commercial = await commercialRepo.findOne(params.id)
    if (commercial) {
      return await commercialRepo.remove(commercial);
    }
    throw new NotFoundException('¡El comercio no existe!');
  }

  /**********************
  **********************
    ATTENTION DAYS ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('att-days')
  async getAttDays() {
    const attRepo = getRepository(AttentionDays);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver días de atención');
    return await attRepo.find();
  }

  @Get('att-days/:id')
  async getAttDaysID(@Param() params: IDParam) {
    const attRepo = getRepository(AttentionDays);
    const cmmRepo = getRepository(Commercial);
    const cmm = await cmmRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver días de atención por comercio');
    return await attRepo.find({ where: { commercial: cmm }});
  }

  @Get('att-day/:id')
  async getAttDay(@Param() params: IDParam) {
    const attRepo = getRepository(AttentionDays);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver día de atención');
    return await attRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('att-day')
  async createAttDay(@Body() body: CreateAttDayBody) {
    const attRepo = getRepository(AttentionDays);
    const cmmRepo = getRepository(Commercial);
    const dayRepo = getRepository(Days);

    const att = new AttentionDays(body.att);

    const cmm = await cmmRepo.findOne(body.commercial_id);
    att.commercial = cmm;

    const day = await dayRepo.findOne(body.day_id);
    att.days = day;

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear día de atención');
    return await attRepo.save(att);
  }

  @Roles('admin')
  @Put('att-day')
  async editAttDay(@Body() body: EditAttDayBody) {
    const attRepo = getRepository(AttentionDays);
    const dayRepo = getRepository(Days);

    const commercial = new AttentionDays(body.att);

    if (body.day_id) {
      const day = await dayRepo.findOne(body.day_id);
      commercial.days = day;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar día de atención');
    return await attRepo.save(commercial);
  }

  @Roles('admin')
  @Delete('att-day/:id')
  async deleteAttDay(@Param() params: IDParam) {
    const attRepo = getRepository(AttentionDays);
    const att = await attRepo.findOne(params.id)
    if (att) {
      return await attRepo.remove(att);
    }
    throw new NotFoundException('¡El día de atención no existe!');
  }

  /**********************
  **********************
    COMMERCIAL CASHBOX ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('cmm-cashboxes')
  async getCmmCashboxes() {
    const cmmCashRepo = getRepository(CommercialCashbox);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cajas del comercio');
    return await cmmCashRepo.find();
  }

  @Get('cmm-cashboxes/:id')
  async getCmmCashboxesId(@Param() params: IDParam) {
    const cmmCashRepo = getRepository(CommercialCashbox);
    const cmmRepo = getRepository(Commercial);
    const cmm = await cmmRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cajas del comercio');
    return await cmmCashRepo.find({ where: { commercial: cmm }});
  }

  @Get('cmm-cashbox/:id')
  async getCmmCashbox(@Param() params: IDParam) {
    const cmmCashRepo = getRepository(CommercialCashbox);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver caja del comercio');
    return await cmmCashRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('cmm-cashbox')
  async createCmmCashbox(@Body() body: CreateCommercialCashBoxBody) {
    const cmmCashRepo = getRepository(CommercialCashbox);
    const cmmRepo = getRepository(Commercial);
    const cshbRepo = getRepository(CashBox);

    const cmmCash = new CommercialCashbox(body.commercial_cashbox);

    const cmm = await cmmRepo.findOne(body.commercial_id);
    cmmCash.commercial = cmm;

    const cashbox = await cshbRepo.findOne(body.cash_id);
    cmmCash.cashbox = cashbox;

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear caja del comercio');
    return await cmmCashRepo.save(cmmCash);
  }

  @Roles('admin')
  @Put('cmm-cashbox')
  async editCmmCashbox(@Body() body: EditCommercialCashBoxBody) {
    const cmmCashRepo = getRepository(CommercialCashbox);
    const cshbRepo = getRepository(CashBox);

    const commercial_cash = new CommercialCashbox(body.commercial_cashbox);

    if (body.cash_id) {
      const cashbox = await cshbRepo.findOne(body.cash_id);
      commercial_cash.cashbox = cashbox;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar caja del comercio');
    return await cmmCashRepo.save(commercial_cash);
  }

  @Roles('admin')
  @Delete('cmm-cashbox/:id')
  async deleteCmmCashbox(@Param() params: IDParam) {
    const cmmCashRepo = getRepository(CommercialCashbox);
    const commercial_cash = await cmmCashRepo.findOne(params.id)
    if (commercial_cash) {
      return await cmmCashRepo.remove(commercial_cash);
    }
    throw new NotFoundException('¡La caja del comercio no existe!');
  }

  /**********************
  **********************
    CASHIER ENDPOINTS
  **********************
  ***********************/

  @Get('cashiers')
  async getCashiers() {
    const cashierRepo = getRepository(Cashier);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cajeros');
    return await cashierRepo.find();
  }

  @Get('cashiers/:id')
  async getCashiersID(@Param() params: IDParam) {
    const cashierRepo = getRepository(Cashier);
    const cmmRepo = getRepository(Commercial);
    const cmm = await cmmRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cajeros del comercio');
    return await cashierRepo.findOne({ where: { commercial: cmm }});
  }

  @Get('cashier/:id')
  async getCashier(@Param() params: IDParam) {
    const cashierRepo = getRepository(CommercialCashbox);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cajero');
    return await cashierRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('cashier')
  async createCashier(@Body() body: CreateCashierBody) {
    const cashierRepo = getRepository(Cashier);
    const cmmCashRepo = getRepository(CommercialCashbox);
    const cmmRepo = getRepository(Commercial);
    const idDocRepo = getRepository(IdentityDocument);
    const stateRepo = getRepository(State);
    const userRepo = getRepository(User);

    const cashier = new Cashier(body.cashier);

    const cmm = await cmmRepo.findOne(body.commercial_id);
    cashier.commercial = cmm;

    const cashbox = await cmmCashRepo.findOne(body.cash_id);
    cashier.commercial_cashbox = cashbox;

    const user = await userRepo.findOne(body.user_id);
    cashier.user = user;

    const idDoc = new IdentityDocument({ detail: body.id_doc });
    const idDocSaved = await idDocRepo.save(idDoc);
    cashier.identity_doc = idDocSaved;

    let state: State;
    if (body.state_id) {
      state = await stateRepo.findOne(body.state_id);
    } else {
      state = await stateRepo.findOne({ where: { detail: 'PENDIENTE' } });
    }
    cashier.state = state;

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear cajero');
    return await cashierRepo.save(cashier);
  }

  @Roles('admin')
  @Put('cashier')
  async editCashier(@Body() body: EditCashierBody) {
    const cashierRepo = getRepository(Cashier);
    const idDocRepo = getRepository(IdentityDocument);
    const stateRepo = getRepository(State);

    const cashier = await cashierRepo.findOne(body.cashier.id, { relations: ['identity_doc', 'state'] });
    Object.assign(cashier, body.cashier);

    if (body.id_doc) {
      const idDoc = cashier.identity_doc;
      idDoc.detail = body.id_doc;
      await idDocRepo.save(idDoc);
    }

    if (body.state_id) {
      const state = await stateRepo.findOne(body.state_id);
      cashier.state = state;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar cajero');
    return await cashierRepo.save(cashier);
  }

  @Roles('admin')
  @Delete('cashier/:id')
  async deleteCashier(@Param() params: IDParam) {
    const cashierRepo = getRepository(Cashier);
    const cashier = await cashierRepo.findOne(params.id)
    if (cashier) {
      return await cashierRepo.remove(cashier);
    }
    throw new NotFoundException('¡El cajero no existe!');
  }
}
