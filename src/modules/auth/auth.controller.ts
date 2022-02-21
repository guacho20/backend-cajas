import { Controller, UseGuards, Post, Request, Get, Body, Param, Response, NotFoundException, Delete, BadRequestException, Put, Patch, NotAcceptableException } from '@nestjs/common';
import { Request as Req, Response as Res } from 'express';
import { Readable } from 'stream';
import * as imageType from 'image-type';
import { LocalAuthGuard } from './local-auth.guard';
import { UserResponse } from 'src/models/user_response.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserRegister } from 'src/models/user_register.model';
import { UserService } from '../user/user.service';
import { Roles, IDUserParam, UserPasswordEdit } from 'src/utils';
import { User } from 'src/entities/user/user.entity';
import { RolesGuard } from './roles.guard';
import { AuditService } from '../audit/audit.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private audit: AuditService
  ) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<{ access_token: string, refresh_token: string }> {
    return this.authService.login(req.user as UserResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refresh(@Request() req: any): Promise<{ access_token: string, refresh_token: string }> {
    return this.authService.login(req.user as UserResponse);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('signup')
  async signup(@Body() newUser: UserRegister) {
    const user = await this.userService.createUser(newUser);
    if (user) {
      return user;
    }
    throw new BadRequestException('La contraseña no es válida de acuerdo a las reglas del perfil');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: Req) {
    return req.user;
  }

  private getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();
  
    stream.push(buffer);
    stream.push(null);
  
    return stream;
  }

  @UseGuards(JwtAuthGuard)
  @Get('photo/:id')
  async getPhoto(@Param() params: IDUserParam, @Response() res: Res) {
    const user = await this.userService.getPhoto(params.id);
    const photo = user.photo ? user.photo : null;
    if (photo) {
      const stream = this.getReadableStream(photo);
      const typeImage = imageType(photo);
      if (typeImage === null) {
        throw new NotAcceptableException('¡El archivo guardado tiene un formato incorrecto!');
      }
      res.set({
        'Content-Type': typeImage.mime,
        'Content-Length': photo.length,
      })
      return stream.pipe(res);
    }
    throw new NotFoundException('¡Este usuario no posee una imagen!');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete/:id')
  async deleteUser(@Request() req: any, @Param() params: IDUserParam) {
    const user = req.user as UserResponse;
    if (user.id !== params.id) {
      return this.userService.deleteUser(params.id);
    }
    throw new BadRequestException('¡No se puede borrar a si mismo!');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('activate/:id')
  async activateUser(@Request() req: any, @Param() params: IDUserParam) {
    const user = req.user as UserResponse;
    if (user.id !== params.id) {
      return this.userService.activeUser(params.id);
    }
    throw new BadRequestException('¡No se puede activar a si mismo!');
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit')
  async editUser(@Request() req: any, @Body() body: User) {
    const user = req.user as UserResponse;
    if (user.profile_id === 1 || user.id === body.id) {
      return this.userService.editUser(body);
    }
    throw new BadRequestException('¡No tiene permisos para editar a este usuario!');
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit/photo/:id')
  async editUserPhoto(@Request() req: any, @Param() params: IDUserParam, @Body() body: { photo: string }) {
    const user = req.user as UserResponse;
    if (user.profile_id === 1 || user.id === params.id) {
      return this.userService.editPhoto(params.id, body.photo);
    }
    throw new BadRequestException('¡No tiene permisos para editar a este usuario!');
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/password/:id')
  async modifyPasswordUser(@Request() req: any, @Param() params: IDUserParam, @Body() body: UserPasswordEdit) {
    const user = req.user as UserResponse;
    if (user.profile_id === 1 || user.id === params.id) {
      if (body.password === body.verifyPassword) {
        return this.userService.modifyPassword(params.id, body.password);
      } else {
        throw new BadRequestException('¡La contraseña no coincide!');
      }
    }
    throw new BadRequestException('¡No tiene permisos para editar a este usuario!');
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req: any) {
    const user = req.user as UserResponse;
    this.audit.createAccessAudit('SALIO DEL SISTEMA', `${user.id}`);
  }
}
