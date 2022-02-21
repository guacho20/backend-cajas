import { Controller, UseGuards, Get, Request, Param, Put, Body, Delete, Post, NotFoundException } from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserResponse } from 'src/models/user_response.model';
import { getRepository } from 'typeorm';
import { AdminModule } from 'src/entities/core/module.entity';
import { IDParam, Roles } from 'src/utils';
import { Option } from 'src/entities/core/option.entity';
import { Params } from 'src/entities/core/params.entity';
import { RolesGuard } from '../auth/roles.guard';
import { EmailServer } from 'src/entities/core/email_server.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('core')
export class CoreController {

  /**********************
  **********************
    MODULES ENDPOINTS
  **********************
  ***********************/

  @Get('modules')
  async getModules(@Request() req: Req) {
    const modulesRepo = getRepository(AdminModule);
    const user = req.user as UserResponse;
    if (user.profile_id === 1) {
      return modulesRepo.find({
        select: ['id', 'detail']
      });
    } else if (user.profile_id === 2) {
      return modulesRepo.find({
        select: ['id', 'detail'],
        where: {
          detail: 'COBROS',
        },
      });
    } else {
      return modulesRepo.find({
        select: ['id', 'detail'],
        where: {
          detail: 'CONSULTAS',
        },
      });
    }
  }

  @Roles('admin')
  @Get('module/:id')
  async getModule(@Param() params: IDParam) {
    const modulesRepo = getRepository(AdminModule);
    return modulesRepo.findOne(params.id);
  }

  @Roles('admin')
  @Put('module/:id')
  async editModule(@Param() params: IDParam, @Body() body: { detail: string }) {
    const modulesRepo = getRepository(AdminModule);
    const module = await modulesRepo.findOne(params.id);
    if (module) {
      module.detail = body.detail;
      return modulesRepo.save(module);
    }
    throw new NotFoundException('¡El módulo no existe!')
  }

  @Roles('admin')
  @Delete('module/:id')
  async deleteModule(@Param() params: IDParam) {
    const modulesRepo = getRepository(AdminModule);
    const exist =  await modulesRepo.findOneOrFail(params.id);
    return modulesRepo.remove(exist);
  }

  /**********************
  **********************
    OPTIONS ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('options')
  async getOptions() {
    const optionsRepo = getRepository(Option);
    return optionsRepo.find();
  }

  @Roles('admin')
  @Get('option/:id')
  async getOption(@Param() params: IDParam) {
    const optionsRepo = getRepository(Option);
    return optionsRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('option')
  async createOptions(@Body() body: Option) {
    const optionsRepo = getRepository(Option);
    return optionsRepo.save(body);
  }

  @Roles('admin')
  @Put('option')
  async editOptions(@Body() body: Option) {
    const optionsRepo = getRepository(Option);
    const exist =  await optionsRepo.findOne(body.id);
    if (exist) {
      return optionsRepo.save(body);
    }
    throw new NotFoundException('¡Esta opción no existe!');
  }

  @Roles('admin')
  @Delete('option/:id')
  async deleteOptions(@Param() params: IDParam) {
    const optionsRepo = getRepository(Option);
    const exist =  await optionsRepo.findOneOrFail(params.id);
    return optionsRepo.remove(exist);
  }

  /**********************
  **********************
    PARAMS ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('params')
  async getParams() {
    const paramsRepo = getRepository(Params);
    return paramsRepo.find();
  }

  @Roles('admin')
  @Get('param/:id')
  async getParam(@Param() params: IDParam) {
    const paramsRepo = getRepository(Params);
    return paramsRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('param')
  async createParam(@Body() body: Params) {
    const paramsRepo = getRepository(Params);
    return paramsRepo.save(body);
  }

  @Roles('admin')
  @Put('param')
  async editParam(@Body() body: Params) {
    const paramsRepo = getRepository(Params);
    const exist =  await paramsRepo.findOneOrFail(body.id);
    if (exist) {
      return paramsRepo.save(body);
    }
    throw new NotFoundException('¡Este parámetro no existe!');
  }

  @Roles('admin')
  @Delete('param/:id')
  async deleteParam(@Param() params: IDParam) {
    const paramsRepo = getRepository(Params);
    const exist =  await paramsRepo.findOneOrFail(params.id);
    return paramsRepo.delete(exist.id);
  }

  /**********************
  **********************
    EMAIL SERVER ENDPOINTS
  **********************
  ***********************/

  @Roles('admin')
  @Get('emails')
  async getEmailServers() {
    const emailsRepo = getRepository(EmailServer);
    return emailsRepo.find();
  }

  @Roles('admin')
  @Get('email/:id')
  async getEmailServer(@Param() params: IDParam) {
    const emailsRepo = getRepository(EmailServer);
    return emailsRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('email')
  async createEmailServer(@Body() body: EmailServer) {
    const emailsRepo = getRepository(EmailServer);
    return await emailsRepo.save(body as EmailServer);
  }

  @Roles('admin')
  @Put('email')
  async editEmailServer(@Body() body: EmailServer) {
    const emailsRepo = getRepository(EmailServer);
    const exist =  await emailsRepo.findOne(body.id);
    if (exist) {
      return await emailsRepo.save(body);
    }
    throw new NotFoundException('¡Este server de Email no existe!');
  }

  @Roles('admin')
  @Delete('email/:id')
  async deleteEmailServer(@Param() params: IDParam) {
    const emailsRepo = getRepository(EmailServer);
    const exist =  await emailsRepo.findOneOrFail(params.id);
    return await emailsRepo.remove(exist);
  }
}
