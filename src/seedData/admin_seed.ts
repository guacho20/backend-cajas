import { AuditAction } from "src/entities/audit/audit_action.entity";

const action1 = new AuditAction();
action1.name = 'INGRESO AL SISTEMA';
action1.detail = 'Cuando se produce un ingreso exitoso al sistema';

const action2 = new AuditAction();
action2.name = 'FALLO INGRESO';
action2.detail = 'Cuando no se puede ingresar al sistema';

const action3 = new AuditAction();
action3.name = 'USUARIO BLOQUEADO';
action3.detail = 'Bloquear Usuario';

const action4 = new AuditAction();
action4.name = 'USUARIO INACTIVO';
action4.detail = 'Inactivar Usuario';

const action5 = new AuditAction();
action5.name = 'USUARIO ACTIVO';
action5.detail = 'Activar Usuario';

const action6 = new AuditAction();
action6.name = 'CAMBIO DE CLAVE';
action6.detail = 'Cambio clave el Usuario';

const action7 = new AuditAction();
action7.name = 'RESETEAR CLAVE USUARIO';
action7.detail = 'Resetea la clave de un Usuario';

const action8 = new AuditAction();
action8.name = 'CADUCO SESION';
action8.detail = 'Cuando Caduca la session del usuario';

const action9 = new AuditAction();
action9.name = 'SALIO DEL SISTEMA';
action9.detail = 'Salio del sistema';

const action10 = new AuditAction();
action10.name = 'CREO USUARIO';
action10.detail = 'Cuando se crea un usuario';

const action11 = new AuditAction();
action11.name = 'USUARIO DESBLOQUEADO';
action11.detail = 'Desbloquear usuario';

const action12 = new AuditAction();
action12.name = 'INGRESO PANTALLA';
action12.detail = 'Cuando un usuario a ingresado a una pantalla';

export const AuditActionSeed: Array<AuditAction> = [
  action1,
  action2,
  action3,
  action4,
  action5,
  action6,
  action7,
  action8,
  action9,
  action10,
  action11,
  action12,
];
