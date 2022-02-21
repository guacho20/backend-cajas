import { AdminModule } from "src/entities/core/module.entity";
import { Option } from "src/entities/core/option.entity";
import { Params } from "src/entities/core/params.entity";

const module1 = new AdminModule();
module1.detail = 'ADMINISTRADOR';
const module2 = new AdminModule();
module2.detail = 'CAJERO';
const module3 = new AdminModule();
module3.detail = 'CONSULTAS';

export const ModulesSeed: Array<AdminModule> = [
  module1,
  module2,
  module3
];

export const option1 = new Option();
option1.menu_name = 'MENU SISTEMA';
option1.screen_name = 'sistema';

export const option2 = new Option();
option2.menu_name = 'Permiso usuarios';
option2.screen_name = 'usuario';

export const option3 = new Option();
option3.menu_name = 'Permisos Pantallas';
option3.screen_name = 'pantallas';

export const option4 = new Option();
option4.menu_name = 'Menu Cobros';
option4.screen_name = 'cobros';

export const option5 = new Option();
option5.menu_name = 'Cobro por transferencia';
option5.screen_name = 'transferencia';

export const option6 = new Option();
option6.menu_name = 'Cobro efectivo';
option6.screen_name = 'cobroefectivo';

export const param1 = new Params();
param1.name = 'p_ingreso_sistema';
param1.detail = 'Parametro que identifica el codigo de ingreso al sistema';
param1.value = '1';
param1.table = 'audit_action';
param1.code_field = 'id';
param1.detail_field = 'name';
param1.apply_table = true;

export const param2 = new Params();
param2.name = 'p_valor_impuesto';
param2.detail = 'Valor de impuesto pago interes';
param2.value = '10';
param2.table = '';
param2.code_field = '';
param2.detail_field = '';
param2.apply_table = false;
