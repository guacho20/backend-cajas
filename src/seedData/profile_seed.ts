import { PasswordRules } from "src/entities/user/password_rules.entity";
import { Profile } from "src/entities/user/profile.entity";

const passrules1 = new PasswordRules();
passrules1.name = 'CLAVE FUERTE';
passrules1.min_lenght = 12;
passrules1.special_chars_num = 2;
passrules1.capital_letters_num = 3;
passrules1.lower_letters_num = 5;
passrules1.numbers_num = 4;
passrules1.attemps = 3;
passrules1.previous_valid_num = 2;

const passrules2 = new PasswordRules();
passrules2.name = 'CLAVE DEBIL';
passrules2.min_lenght = 8;
passrules2.special_chars_num = 1;
passrules2.capital_letters_num = 1;
passrules2.lower_letters_num = 2;
passrules2.numbers_num = 1;
passrules2.attemps = 5;
passrules2.previous_valid_num = 4;

export const PasswordRulesSeed: Array<PasswordRules> = [
  passrules1,
  passrules2
];

export const profile1 = new Profile();
profile1.profile = 'ADMINISTRADOR';
profile1.detail = 'PERFIL DE ADMINISTRACION DEL SISTEMA',
profile1.apply_pass_history = true;

export const profile2 = new Profile();
profile2.profile = 'CAJERO';
profile2.detail = 'PERFIL DEL CAJERO',
profile2.apply_pass_history = true;

export const profile3 = new Profile();
profile3.profile = 'CONSULTAS';
profile3.detail = 'PERFIL DE CONSULTAS',
profile3.apply_pass_history = false;
