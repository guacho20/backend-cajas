import { Injectable, BadRequestException, UnauthorizedException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { getRepository } from 'typeorm';
import * as imageType from 'image-type';
import { User } from 'src/entities/user/user.entity';
import { Profile } from 'src/entities/user/profile.entity';
import { UserPassword } from 'src/entities/user/user_password.entity';
import { UserRegister } from 'src/models/user_register.model';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class UserService {

  constructor(private audit: AuditService) {}

  async findOne(email: string): Promise<User | undefined> {
    const userRepo = getRepository(User);

    return userRepo.findOne({where: {email: email, is_active: true}, relations: ["password", "profile"] });
  }

  async getProfile(profileId: number): Promise<Profile | undefined> {
    const userRepo = getRepository(Profile);

    return userRepo.findOne(profileId, { relations: ["password_rules"] });
  }

  async getPhoto(profileId: string): Promise<User | undefined> {
    const userRepo = getRepository(User);

    return userRepo.findOne(profileId, { select: ['photo'] });
  }

  async deleteUser(userId: string) {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(userId, { where: { is_active: true } });

    if (!user) throw new NotFoundException('¡El usuario no existe!');

    user.is_active = false;
    this.audit.createAccessAudit('USUARIO INACTIVO', 'Desactivar usuario');

    return await userRepo.save(user);
  }

  async activeUser(userId: string) {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(userId);

    if (!user) throw new NotFoundException('¡El usuario no existe!');

    user.is_active = true;
    this.audit.createAccessAudit('USUARIO ACTIVO', 'Activar usuario');

    return await userRepo.save(user);
  }

  async createUser(user: UserRegister): Promise<User | undefined> {
    const userRepo = getRepository(User);
    const passwordRepo = getRepository(UserPassword);
    const isUser = await userRepo.findOne({where: {email: user.email}});
    if (isUser) {
      throw new BadRequestException("This user is registered already!");
    }
    const profile = await this.getProfile(user.profile_id);

    if (!profile) {
      throw new BadRequestException("This profile doesn\'t exist");
    }

    const rules = profile.password_rules;
    console.log(profile);
    if (!rules) {
      throw new BadRequestException("This profile has no password rules");
    }

    if (rules.comparePasswordRules(user.password)) {
      const password = new UserPassword();
      password.password = user.password;
      
      const passSaved = await passwordRepo.save(password);

      const newUser = new User();
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.expiration_date = user.expiration_date ? user.expiration_date : null;
      newUser.theme = user.theme ? user.theme : '';
      newUser.photo = user.photo ? Buffer.from(user.photo, 'base64') : null;
      newUser.profile = profile;
      newUser.password = passSaved

      
      this.audit.createAccessAudit('CREO USUARIO', 'Crear usuario');
      return await userRepo.save(newUser);
    }
    return null;
  }

  async modifyPassword(userId: string, password: string) {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(userId, { where: { is_active: true }, relations: ['password', 'profile', 'profile.password_rules']});

    if(user) {
      const rules = user.profile.password_rules;
      if (rules.comparePasswordRules(password)) {
        const passwordRepo = getRepository(UserPassword);
        await passwordRepo.delete(user.password.id)
        const passwordRecord = new UserPassword();
        passwordRecord.password = password;
        
        const passSaved = await passwordRepo.save(passwordRecord);
        user.password = passSaved;
        this.audit.createAccessAudit('CAMBIO DE CLAVE', 'Cambiar clave');
        return await userRepo.save(user);
      }
      throw new BadRequestException('¡No se ha superado la validación del password!');
    }
    throw new UnauthorizedException('¡El usuario no existe!');
  }

  async editUser(body: User) {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(body.id, { where: { is_active: true }, relations: ['profile', 'profile.password_rules']});

    if(user) {
      return await userRepo.save(body);
    }
    throw new UnauthorizedException('¡El usuario no existe!');
  }

  async editPhoto(userId: string, photo: string) {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(userId, { where: { is_active: true } });

    if(user) {
      const photoBuff = new Buffer(photo, 'base64');
      const typeImage = imageType(photoBuff);
      if (typeImage === null) {
        throw new NotAcceptableException('¡El archivo tiene un formato incorrecto!');
      }
      user.photo = photoBuff;
      return await userRepo.save(user);
    }
    throw new UnauthorizedException('¡El usuario no existe!');
  }
}
