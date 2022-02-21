import { Controller, Get, Param, Post, Put, Body, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { AuditService } from 'src/modules/audit/audit.service';
import { Charges } from 'src/entities/web/charges.entity';
import { Commercial } from 'src/entities/web/commercial.entity';
import {
  IDParam,
  Roles,
  CreateChargeBody,
  EditChargeBody,
  CreateCommercialPaymentBody,
  EditCommercialPaymentBody,
  CreatePaymentBody,
  EditPaymentBody,
  CreateDepartmentPaymentBody,
  EditDepartmentPaymentBody,
  CreateCashierPaymentBody,
  EditCashierPaymentBody
} from 'src/utils';
import { Cashier } from 'src/entities/web/cashier.entity';
import { CashBox } from 'src/entities/web/cashbox.entity';
import { Department } from 'src/entities/web/department.entity';
import { State } from 'src/entities/web/state.entity';
import { PaymentMethod } from 'src/entities/web/payment_method.entity';
import { Bank } from 'src/entities/web/bank.entity';
import { CommercialPayment } from 'src/entities/web/commercial_payment.entity';
import { Payment } from 'src/entities/web/payment.entity';
import { DepartmentPay } from 'src/entities/web/department_pay.entity';
import { CashierPayment } from 'src/entities/web/cashier_payment.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('commercial-operations')
export class CommercialOperationsController {

  constructor(private audit: AuditService) {}

  /**********************
  **********************
    CHARGES ENDPOINTS
  **********************
  ***********************/

  @Get('charges')
  async getCharges() {
    const chargesRepo = getRepository(Charges);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cargos');
    return await chargesRepo.find();
  }

  @Get('charges/:id')
  async getChargesID(@Param() params: IDParam) {
    const chargesRepo = getRepository(Charges);
    const cmmRepo = getRepository(Commercial);
    const cmm = await cmmRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cargos por comercio');
    return await chargesRepo.find({ where: { commercial: cmm }});
  }

  @Get('charge/:id')
  async getCharge(@Param() params: IDParam) {
    const chargesRepo = getRepository(Charges);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver cargo');
    return await chargesRepo.findOne(params.id);
  }

  @Roles('admin', 'cashier')
  @Post('charge')
  async createCharge(@Body() body: CreateChargeBody) {
    const chargesRepo = getRepository(Charges);
    const cashierRepo = getRepository(Cashier);
    const cashRepo = getRepository(CashBox);
    const cmmRepo = getRepository(Commercial);
    const dptRepo = getRepository(Department);
    const bankRepo = getRepository(Bank);
    const paymentMethodRepo = getRepository(PaymentMethod);
    const stateRepo = getRepository(State);

    const charge = new Charges(body.charge);

    const state = await stateRepo.findOne(1);
    charge.web_state = state;
    charge.state = state;

    const cashier = await cashierRepo.findOne(body.cashier_id);
    charge.cashier = cashier;

    const cashbox = await cashRepo.findOne(body.cashbox_id);
    charge.cashbox = cashbox;

    const commercial = await cmmRepo.findOne(body.commercial_id);
    charge.commercial = commercial;

    const dpt = await dptRepo.findOne(body.department_id);
    charge.department = dpt;

    const bank = await bankRepo.findOne(body.bank_id);
    charge.bank = bank;

    const pm = await paymentMethodRepo.findOne(body.payment_method_id);
    charge.payment_method = pm;

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear cargo');
    return await chargesRepo.save(charge);
  }

  @Roles('admin', 'cashier')
  @Put('charge')
  async editCharge(@Body() body: EditChargeBody) {
    const chargesRepo = getRepository(Charges);
    const cashierRepo = getRepository(Cashier);
    const cashRepo = getRepository(CashBox);
    const cmmRepo = getRepository(Commercial);
    const dptRepo = getRepository(Department);
    const bankRepo = getRepository(Bank);
    const paymentMethodRepo = getRepository(PaymentMethod);
    const stateRepo = getRepository(State);

    const charge = new Charges(body.charge);

    if (body.state_id) {
      const state = await stateRepo.findOne(body.state_id);
      charge.web_state = state;
      charge.state = state;
    }

    if (body.cashier_id) {
      const cashier = await cashierRepo.findOne(body.cashier_id);
      charge.cashier = cashier;
    }

    if (body.cashbox_id) {
      const cashbox = await cashRepo.findOne(body.cashbox_id);
      charge.cashbox = cashbox;
    }

    if (body.commercial_id) {
      const commercial = await cmmRepo.findOne(body.commercial_id);
      charge.commercial = commercial;
    }

    if (body.department_id) {
      const dpt = await dptRepo.findOne(body.department_id);
      charge.department = dpt;
    }

    if (body.bank_id) {
      const bank = await bankRepo.findOne(body.bank_id);
      charge.bank = bank;
    }

    if (body.payment_method_id) {
      const pm = await paymentMethodRepo.findOne(body.payment_method_id);
      charge.payment_method = pm;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar cargo');
    return await chargesRepo.save(charge);
  }

  @Roles('admin')
  @Delete('charge/:id')
  async deleteCharge(@Param() params: IDParam) {
    const chargesRepo = getRepository(Charges);
    const charge = await chargesRepo.findOne(params.id)
    if (charge) {
      return await chargesRepo.remove(charge);
    }
    throw new NotFoundException('¡El cargo no existe!');
  }

  /**********************
  **********************
    COMMERCIAL PAYMENTS ENDPOINTS
  **********************
  ***********************/

  @Get('commercial-payments')
  async getCommercialPayments() {
    const cmmPaymentRepo = getRepository(CommercialPayment);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pagos de comercios');
    return await cmmPaymentRepo.find();
  }

  @Get('commercial-payments/:id')
  async getCommercialPaymentsID(@Param() params: IDParam) {
    const cmmPaymentRepo = getRepository(CommercialPayment);
    const cmmRepo = getRepository(Commercial);
    const cmm = await cmmRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pagos por comercio asignado');
    return await cmmPaymentRepo.find({ where: { commercial: cmm }});
  }

  @Get('commercial-payment/:id')
  async getCommercialPayment(@Param() params: IDParam) {
    const cmmPaymentRepo = getRepository(CommercialPayment);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pago del comercio');
    return await cmmPaymentRepo.findOne(params.id);
  }

  @Roles('admin', 'cashier')
  @Post('commercial-payment')
  async createCommercialPayment(@Body() body: CreateCommercialPaymentBody) {
    const cmmPaymentRepo = getRepository(CommercialPayment);
    const cmmRepo = getRepository(Commercial);
    const bankRepo = getRepository(Bank);
    const paymentMethodRepo = getRepository(PaymentMethod);
    const stateRepo = getRepository(State);

    const cmmPayment = new CommercialPayment(body.payment);

    const state = await stateRepo.findOne(1);
    cmmPayment.state = state;

    const commercial = await cmmRepo.findOne(body.commercial_id);
    cmmPayment.commercial = commercial;

    const bank = await bankRepo.findOne(body.bank_id);
    cmmPayment.bank = bank;

    const pm = await paymentMethodRepo.findOne(body.payment_method_id);
    cmmPayment.payment_method = pm;

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear pago del comercio');
    return await cmmPaymentRepo.save(cmmPayment);
  }

  @Roles('admin', 'cashier')
  @Put('commercial-payment')
  async editCommercialPayment(@Body() body: EditCommercialPaymentBody) {
    const cmmPaymentRepo = getRepository(CommercialPayment);
    const cmmRepo = getRepository(Commercial);
    const bankRepo = getRepository(Bank);
    const paymentMethodRepo = getRepository(PaymentMethod);
    const stateRepo = getRepository(State);

    const cmmPayment = new CommercialPayment(body.payment);

    if (body.state_id) {
      const state = await stateRepo.findOne(body.state_id);
      cmmPayment.state = state;
    }

    if (body.commercial_id) {
      const commercial = await cmmRepo.findOne(body.commercial_id);
      cmmPayment.commercial = commercial;
    }

    if (body.bank_id) {
      const bank = await bankRepo.findOne(body.bank_id);
      cmmPayment.bank = bank;
    }

    if (body.payment_method_id) {
      const pm = await paymentMethodRepo.findOne(body.payment_method_id);
      cmmPayment.payment_method = pm;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar pago del comercio');
    return await cmmPaymentRepo.save(cmmPayment);
  }

  @Roles('admin')
  @Delete('commercial-payment/:id')
  async deleteCommercialPayment(@Param() params: IDParam) {
    const cmmPaymentRepo = getRepository(CommercialPayment);
    const cmmPayment = await cmmPaymentRepo.findOne(params.id)
    if (cmmPayment) {
      return await cmmPaymentRepo.remove(cmmPayment);
    }
    throw new NotFoundException('¡El pago del comercio no existe!');
  }

  /**********************
  **********************
    PAYMENTS ENDPOINTS
  **********************
  ***********************/

  @Get('payments')
  async getPayments() {
    const paymentRepo = getRepository(Payment);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pagos');
    return await paymentRepo.find();
  }

  @Get('payments/:id')
  async getPaymentsID(@Param() params: IDParam) {
    const paymentRepo = getRepository(Payment);
    const cmmRepo = getRepository(Commercial);
    const cmm = await cmmRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pagos por comercio');
    return await paymentRepo.find({ where: { commercial: cmm }});
  }

  @Get('payment/:id')
  async getPayment(@Param() params: IDParam) {
    const paymentRepo = getRepository(Payment);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pago');
    return await paymentRepo.findOne(params.id);
  }

  @Roles('admin', 'cashier')
  @Post('payment')
  async createPayment(@Body() body: CreatePaymentBody) {
    const paymentRepo = getRepository(Payment);
    const cmmRepo = getRepository(Commercial);
    const paymentMethodRepo = getRepository(PaymentMethod);

    const payment = new Payment(body.payment);

    const commercial = await cmmRepo.findOne(body.commercial_id);
    payment.commercial = commercial;

    const pm = await paymentMethodRepo.findOne(body.payment_method_id);
    payment.payment_method = pm;

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear cargo');
    return await paymentRepo.save(payment);
  }

  @Roles('admin', 'cashier')
  @Put('payment')
  async editPayment(@Body() body: EditPaymentBody) {
    const paymentRepo = getRepository(Payment);
    const cmmRepo = getRepository(Commercial);
    const paymentMethodRepo = getRepository(PaymentMethod);

    const payment = new Payment(body.payment);

    if (body.commercial_id) {
      const commercial = await cmmRepo.findOne(body.commercial_id);
      payment.commercial = commercial;
    }

    if (body.payment_method_id) {
      const pm = await paymentMethodRepo.findOne(body.payment_method_id);
      payment.payment_method = pm;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar cargo');
    return await paymentRepo.save(payment);
  }

  @Roles('admin')
  @Delete('payment/:id')
  async deletePayment(@Param() params: IDParam) {
    const paymentRepo = getRepository(Payment);
    const payment = await paymentRepo.findOne(params.id)
    if (payment) {
      return await paymentRepo.remove(payment);
    }
    throw new NotFoundException('¡El cargo no existe!');
  }

  /**********************
  **********************
    DEPARMENTS PAYS ENDPOINTS
  **********************
  ***********************/

  @Get('department-payments')
  async getDepartmentPayments() {
    const dptPaymentRepo = getRepository(DepartmentPay);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pagos de departamentos');
    return await dptPaymentRepo.find();
  }

  @Get('department-payments/:id')
  async getDepartmentPaymentsID(@Param() params: IDParam) {
    const dptPaymentRepo = getRepository(DepartmentPay);
    const dptRepo = getRepository(Department);
    const cmm = await dptRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pagos por departamento');
    return await dptPaymentRepo.find({ where: { department: cmm }});
  }

  @Get('department-payment/:id')
  async getDepartmentPayment(@Param() params: IDParam) {
    const dptPaymentRepo = getRepository(DepartmentPay);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pago de departamento');
    return await dptPaymentRepo.findOne(params.id);
  }

  @Roles('admin', 'cashier')
  @Post('department-payment')
  async createDepartmentPayment(@Body() body: CreateDepartmentPaymentBody) {
    const paymentRepo = getRepository(DepartmentPay);
    const dptRepo = getRepository(Department);

    const payment = new DepartmentPay(body.payment);

    const dpt = await dptRepo.findOne(body.deparment_id);
    payment.department = dpt;

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear pago de departamentos');
    return await paymentRepo.save(payment);
  }

  @Roles('admin', 'cashier')
  @Put('department-payment')
  async editDepartmentPayment(@Body() body: EditDepartmentPaymentBody) {
    const paymentRepo = getRepository(DepartmentPay);
    const dptRepo = getRepository(Department);

    const payment = new DepartmentPay(body.payment);

    if (body.deparment_id) {
      const dpt = await dptRepo.findOne(body.deparment_id);
      payment.department = dpt;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar pago de departamentos');
    return await paymentRepo.save(payment);
  }

  @Roles('admin')
  @Delete('department-payment/:id')
  async deleteDepartmentPayment(@Param() params: IDParam) {
    const paymentRepo = getRepository(DepartmentPay);
    const payment = await paymentRepo.findOne(params.id)
    if (payment) {
      return await paymentRepo.remove(payment);
    }
    throw new NotFoundException('¡El  pago de departamentos no existe!');
  }

  /**********************
  **********************
    CASHIER PAYS ENDPOINTS
  **********************
  ***********************/

  @Get('cashier-payments')
  async getCashierPayments() {
    const paymentRepo = getRepository(CashierPayment);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pagos de cajeros');
    return await paymentRepo.find();
  }

  @Get('cashier-payments/:id')
  async getCashierPaymentsID(@Param() params: IDParam) {
    const paymentRepo = getRepository(CashierPayment);
    const cashierRepo = getRepository(Cashier);
    const cashier = await cashierRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pagos por cajeros');
    return await paymentRepo.find({ where: { cashier: cashier }});
  }

  @Get('cashier-payment/:id')
  async getCashierPayment(@Param() params: IDParam) {
    const paymentRepo = getRepository(CashierPayment);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver pago de cajero');
    return await paymentRepo.findOne(params.id);
  }

  @Roles('admin', 'cashier')
  @Post('cashier-payment')
  async createCashierPayment(@Body() body: CreateCashierPaymentBody) {
    const paymentRepo = getRepository(CashierPayment);
    const cashierRepo = getRepository(Cashier);

    const payment = new CashierPayment(body.payment);

    const cashier = await cashierRepo.findOne(body.cashier_id);
    payment.cashier = cashier;

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear pago de cajero');
    return await paymentRepo.save(payment);
  }

  @Roles('admin', 'cashier')
  @Put('cashier-payment')
  async editCashierPayment(@Body() body: EditCashierPaymentBody) {
    const paymentRepo = getRepository(CashierPayment);
    const cashierRepo = getRepository(Cashier);

    const payment = new CashierPayment(body.payment);

    if (body.cashier_id) {
      const cashier = await cashierRepo.findOne(body.cashier_id);
      payment.cashier = cashier;
    }

    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar pago de cajero');
    return await paymentRepo.save(payment);
  }

  @Roles('admin')
  @Delete('cashier-payment/:id')
  async deleteCashierPayment(@Param() params: IDParam) {
    const paymentRepo = getRepository(CashierPayment);
    const payment = await paymentRepo.findOne(params.id)
    if (payment) {
      return await paymentRepo.remove(payment);
    }
    throw new NotFoundException('¡El pago de cajero no existe!');
  }
}
