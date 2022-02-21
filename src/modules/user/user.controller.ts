import { Controller, UseGuards, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles, IDParam, CreateProfileBody, IDUserParam } from 'src/utils';
import { getRepository } from 'typeorm';
import { Profile } from 'src/entities/user/profile.entity';
import { OptionProfile } from 'src/entities/core/option_profile.entity';
import { Option } from 'src/entities/core/option.entity';
import { PasswordRules } from 'src/entities/user/password_rules.entity';
import { AuditService } from '../audit/audit.service';
import { User } from 'src/entities/user/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('user')
export class UserController {

  constructor(private audit: AuditService) {}

  /**********************
  **********************
    USERS ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('user/:id')
  async getUser(@Param() params: IDUserParam) {
    const usersRepo = getRepository(User);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver usuarios');
    return usersRepo.findOne(params.id, { loadRelationIds: true });
  }

  @Roles('admin')
  @Put('profile/:id')
  async editProfileUsers(@Param() params: IDUserParam, @Body() profile: { profile_id: number }) {
    const usersRepo = getRepository(User);
    const profileRepo = getRepository(Profile);
    const user = await usersRepo.findOne(params.id);
    const profileObj = await profileRepo.findOne(profile.profile_id);
    if (user || profileObj) {
      user.profile = profileObj;
      this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar perfil');
      return await usersRepo.save(user);
    }
    throw new BadRequestException('¡El usuario que intenta editar no existe!');
  }

  @Roles('admin')
  @Get('users')
  async getUsers() {
    const usersRepo = getRepository(User);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver usuarios');
    return usersRepo.createQueryBuilder('user')
      .select([ 'user.id', 'user.name', 'user.email', 'user.is_active', 'profile.id', 'profile.profile' ])
      .leftJoin('user.profile', 'profile')
      .getMany();
  }

  /**********************
  **********************
    PROFILES ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('profiles')
  async getProfiles() {
    const profileRepo = getRepository(Profile);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver perfiles');
    return profileRepo.find({ loadRelationIds: true });
  }

  @Roles('admin')
  @Get('profile/:id')
  async getProfile(@Param() params: IDParam) {
    const profileRepo = getRepository(Profile);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver perfil');
    return profileRepo.findOne(params.id, { relations: ['password_rules'] });
  }

  @Roles('admin')
  @Post('profile')
  async createProfile(@Body() body: CreateProfileBody) {
    const profileRepo = getRepository(Profile);
    const profileSaved = await profileRepo.save(body.profile as Profile);
    
    if (body.option_id) {
      const option = await getRepository(Option).findOne(body.option_id);
  
      const optionPRepo = getRepository(OptionProfile);
      const newOP = new OptionProfile();
      newOP.option = option;
      newOP.profile = profileSaved;
      await optionPRepo.save(newOP);
    }
    return profileSaved;
  }

  @Roles('admin')
  @Put('profile/:id')
  async editProfile(@Param() params: IDParam, @Body() body: Profile) {
    const profileRepo = getRepository(Profile);
    const exist =  await profileRepo.findOne(params.id);
    if (exist) {
      return profileRepo.save(body);
    }
    throw new NotFoundException('¡Este server de Email no existe!');
  }

  @Roles('admin')
  @Delete('profile/:id')
  async deleteProfile(@Param() params: IDParam) {
    const profileRepo = getRepository(Profile);
    const exist =  await profileRepo.findOneOrFail(params.id);
  
    const optionPRepo = getRepository(OptionProfile);
    await optionPRepo.delete(exist.options.map(item => item.id))
    return profileRepo.remove(exist);
  }

  /**********************
  **********************
    PASSWORD RULES ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('pw_rules')
  async getPWRules() {
    const pwRRepo = getRepository(PasswordRules);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver reglas de contraseña');
    return pwRRepo.find();
  }

  @Roles('admin')
  @Get('pw_rule/:id')
  async getPWRule(@Param() params: IDParam) {
    const pwRRepo = getRepository(PasswordRules);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver regla de contraseña');
    return pwRRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('pw_rule')
  async createPWRule(@Body() body: Partial<PasswordRules>) {
    const pwRRepo = getRepository(PasswordRules);
    const pwRObj = new PasswordRules(body);
    const pwRSaved = await pwRRepo.save(pwRObj);
    return pwRSaved;
  }

  @Roles('admin')
  @Put('pw_rule')
  async editPWRule(@Body() body: PasswordRules) {
    const pwRRepo = getRepository(PasswordRules);
    const exist =  await pwRRepo.findOneOrFail(body.id);
    if (exist) {
      return pwRRepo.save(body);
    }
    throw new NotFoundException('¡Este server de Email no existe!');
  }

  @Roles('admin')
  @Delete('pw_rule/:id')
  async deletePWRule(@Param() params: IDParam) {
    const pwRRepo = getRepository(PasswordRules);
    const exist =  await pwRRepo.findOneOrFail(params.id);
    return pwRRepo.remove(exist);
  }
}
