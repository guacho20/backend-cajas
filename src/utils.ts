import { SetMetadata } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Profile } from './entities/user/profile.entity';
import { City } from './entities/web/city.entity';
import { Commercial } from './entities/web/commercial.entity';
import { AttentionDays } from './entities/web/attention_days.entity';
import { CommercialCashbox } from './entities/web/commercial_cashbox.entity';
import { Cashier } from './entities/web/cashier.entity';
import { Charges } from './entities/web/charges.entity';
import { CommercialPayment } from './entities/web/commercial_payment.entity';
import { Payment } from './entities/web/payment.entity';
import { DepartmentPay } from './entities/web/department_pay.entity';
import { CashierPayment } from './entities/web/cashier_payment.entity';

export class IDParam {
  id: number;
}

export class IDUserParam {
  id: string;
}

export class UserPasswordEdit {
  password: string;
  verifyPassword: string;
}

export class CreateProfileBody {
  profile: QueryDeepPartialEntity<Profile>;
  option_id?: number;
}

export class CreateCityBody {
  city: City;
  province_id?: number;
}

export class CreateCommercialBody {
  commercial: Commercial;
  city_id: number;
  type_id: number;
  state_id?: number;
}

export class EditCommercialBody {
  commercial: Commercial;
  city_id?: number;
  type_id?: number;
  state_id?: number;
}

export class CreateAttDayBody {
  att: AttentionDays;
  commercial_id: number;
  day_id: number;
}

export class EditAttDayBody {
  att: AttentionDays;
  day_id?: number;
}

export class CreateCommercialCashBoxBody {
  commercial_cashbox: CommercialCashbox;
  commercial_id: number;
  cash_id: number;
}

export class EditCommercialCashBoxBody {
  commercial_cashbox: CommercialCashbox;
  cash_id?: number;
}

export class CreateCashierBody {
  cashier: Cashier;
  commercial_id: number;
  cash_id: number;
  id_doc: string;
  user_id: number;
  state_id?: number;
}

export class EditCashierBody {
  cashier: Cashier;
  id_doc?: string;
  state_id?: number;
}

export class CreateChargeBody {
  charge: Charges;
  cashier_id: number;
  commercial_id: number;
  department_id: number;
  cashbox_id: string;
  bank_id: number;
  payment_method_id: number;
}

export class EditChargeBody {
  charge: Charges;
  cashier_id?: number;
  commercial_id?: number;
  department_id?: number;
  cashbox_id?: string;
  bank_id?: number;
  payment_method_id?: number;
  state_id?: number;
  web_state_id?: number;
}

export class CreateCommercialPaymentBody {
  payment: CommercialPayment;
  commercial_id: number;
  bank_id: number;
  payment_method_id: number;
}

export class EditCommercialPaymentBody {
  payment: CommercialPayment;
  commercial_id?: number;
  bank_id?: number;
  payment_method_id?: number;
  state_id?: number;
}

export class CreatePaymentBody {
  payment: Payment;
  commercial_id: number;
  payment_method_id: number;
}

export class EditPaymentBody {
  payment: Payment;
  commercial_id?: number;
  payment_method_id?: number;
}

export class CreateDepartmentPaymentBody {
  payment: DepartmentPay;
  deparment_id: number;
}

export class EditDepartmentPaymentBody {
  payment: DepartmentPay;
  deparment_id?: number;
}

export class CreateCashierPaymentBody {
  payment: CashierPayment;
  cashier_id: number;
  payment_method_id: number;
}

export class EditCashierPaymentBody {
  payment: CashierPayment;
  cashier_id?: number;
  payment_method_id?: number;
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
