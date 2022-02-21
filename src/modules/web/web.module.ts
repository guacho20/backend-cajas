import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Province } from 'src/entities/web/province.entity';
import { City } from 'src/entities/web/city.entity';
import { Bank } from 'src/entities/web/bank.entity';
import { CashBox } from 'src/entities/web/cashbox.entity';
import { State } from 'src/entities/web/state.entity';
import { Days } from 'src/entities/web/days.entity';
import { AttentionDays } from 'src/entities/web/attention_days.entity';
import { BusinessType } from 'src/entities/web/business_type.entity';
import { PaymentMethod } from 'src/entities/web/payment_method.entity';
import { Department } from 'src/entities/web/department.entity';
import { DepartmentPay } from 'src/entities/web/department_pay.entity';
import { Payment } from 'src/entities/web/payment.entity';
import { IdentityDocument } from 'src/entities/web/id_doc.entity';
import { Cashier } from 'src/entities/web/cashier.entity';
import { Commercial } from 'src/entities/web/commercial.entity';
import { CommercialCashbox } from 'src/entities/web/commercial_cashbox.entity';
import { CommercialPayment } from 'src/entities/web/commercial_payment.entity';
import { CashierPayment } from 'src/entities/web/cashier_payment.entity';
import { Charges } from 'src/entities/web/charges.entity';
import { XlsFile } from 'src/entities/web/xls_file.entity';
import { GeneralController } from './general/general.controller';
import { AuditModule } from '../audit/audit.module';
import { CommercialSettingsController } from './commercial-settings/commercial-settings.controller';
import { CommercialEntitiesController } from './commercial-entities/commercial-entities.controller';
import { CommercialOperationsController } from './commercial-operations/commercial-operations.controller';
import { XlsController } from './xls/xls.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Province,
        City,
        Bank,
        CashBox,
        State,
        Days,
        AttentionDays,
        BusinessType,
        PaymentMethod,
        Department,
        DepartmentPay,
        Payment,
        IdentityDocument,
        Commercial,
        CommercialCashbox,
        CommercialPayment,
        Cashier,
        CashierPayment,
        Charges,
        XlsFile
      ]
    ),
    AuditModule
  ],
  controllers: [GeneralController, CommercialSettingsController, CommercialEntitiesController, CommercialOperationsController, XlsController]
})
export class WebModule {}
