import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { AuditActionSeed } from "src/seedData/admin_seed";
import { ModulesSeed, option1, option2, option3, option4, option5, option6, param1, param2 } from "src/seedData/core_seed";
import { PasswordRulesSeed, profile1, profile2, profile3 } from "src/seedData/profile_seed";
import { UserPassword } from 'src/entities/user/user_password.entity';
import { User } from 'src/entities/user/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    console.log(connection.entityMetadatas);
    await connection.getRepository("audit_action").save(AuditActionSeed);
    const moduleActions = await connection.getRepository("admin_module").save(ModulesSeed);

    const optionRepo = connection.getRepository('option');

    const option1Parent = await optionRepo.save(option1);

    option2.parent = option1Parent;
    await optionRepo.save(option2);

    option3.parent = option1;
    await optionRepo.save(option3);

    const option2Parent = await optionRepo.save(option4);

    option5.parent = option2Parent;
    await optionRepo.save(option5);

    option6.parent = option2Parent;
    await optionRepo.save(option6);

    const paramsRepo = connection.getRepository('params');
    param1.module = moduleActions[0];
    await paramsRepo.save(param1);
    param2.module = moduleActions[1];
    await paramsRepo.save(param2);


    const passRulesRepo = await connection.getRepository('password_rules').save(PasswordRulesSeed);
    profile1.password_rules = passRulesRepo[0];
    profile2.password_rules = passRulesRepo[0];
    profile3.password_rules = passRulesRepo[1];

    const profileRepo = connection.getRepository('profile');
    const profiles = await profileRepo.save([profile1, profile2, profile3]);

    const bankRepo = connection.getRepository('bank');
    bankRepo.save([
      { detail: 'BANCO 1', code: '001', abbr: 'BC1' },
      { detail: 'BANCO 2', code: '002', abbr: 'BC2' },
      { detail: 'BANCO 3', code: '003', abbr: 'BC3' },
    ]);

    const cashBoxRepo = connection.getRepository('cash_box');
    cashBoxRepo.save([
      { detail: 'CAJA 1' },
      { detail: 'CAJA 2' },
    ]);

    const provinceRepo = connection.getRepository('province');
    const provincesSaved = await provinceRepo.save([
      { detail: 'PICHINCHA' },
      { detail: 'COTOPAXI' },
    ]);

    const cityRepo = connection.getRepository('city');
    await cityRepo.save([
      { detail: 'Quito', province: provincesSaved[0] },
      { detail: 'Mejia', province: provincesSaved[0] },
      { detail: 'Latacunga', province: provincesSaved[1] },
    ]);

    const daysRepo = connection.getRepository('days');
    await daysRepo.save([
      { detail: 'LUNES' },
      { detail: 'MARTES' },
      { detail: 'MIERCOLES' },
      { detail: 'JUEVES' },
      { detail: 'VIERNES' },
      { detail: 'SABADO' },
      { detail: 'DOMINGO' },
    ]);

    const stateRepo = connection.getRepository('state');
    await stateRepo.save([
      { detail: 'PENDIENTE' },
      { detail: 'ACTIVADO' },
      { detail: 'INVALIDO' },
      { detail: 'ACTIVO' },
      { detail: 'COBRADO' },
      { detail: 'SIN BONIFICAR' },
      { detail: 'BONIFICADO' },
      { detail: 'INACTIVO' },
    ]);

    const payMethodRepo = connection.getRepository('payment_method');
    await payMethodRepo.save([
      { detail: 'EFECTIVO' },
      { detail: 'TARJETA DE CREDITO' },
      { detail: 'TRANSACCION' },
      { detail: 'BONIFICACION' },
    ]);

    const businessTypeRepo = connection.getRepository('business_type');
    await businessTypeRepo.save([
      { detail: 'TIENDA DE ABARROTES' },
      { detail: 'VIVERES' },
      { detail: 'PAPELERIA' },
    ]);

    const passwordRepo = connection.getRepository('user_password');
    const password = new UserPassword({
      password: 'HoLaSoYaDoLfO2!3#23',
    });
    await password.hashPassword();
    const passSaved = await passwordRepo.save(password);

    const userRepo = connection.getRepository('user');
    const user = new User({
      profile: profiles[0],
      password: passSaved,
      email: "admin@example.com",
      name: "Adolfo Bastardo",
      theme: 'light'
    });
    await userRepo.save(user);
  }
}