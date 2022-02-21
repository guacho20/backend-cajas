import { Controller, UseGuards, Get, Param, Post, Body, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { getRepository } from 'typeorm';
import { Province } from 'src/entities/web/province.entity';
import { IDParam, Roles, CreateCityBody } from 'src/utils';
import { AuditService } from 'src/modules/audit/audit.service';
import { City } from 'src/entities/web/city.entity';
import { Days } from 'src/entities/web/days.entity';
import { State } from 'src/entities/web/state.entity';
import { IdentityDocument } from 'src/entities/web/id_doc.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('general')
export class GeneralController {

  constructor(private audit: AuditService) {}

  /**********************
  **********************
    PROVINCES ENDPOINTS
  **********************
  ***********************/

  @Get('provinces')
  async getProvinces() {
    const proRepo = getRepository(Province);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver provincias');
    return await proRepo.find();
  }

  @Get('province/:id')
  async getProvince(@Param() params: IDParam) {
    const proRepo = getRepository(Province);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver provincia');
    return await proRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('province')
  async createProvince(@Body() body: Province) {
    const proRepo = getRepository(Province);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear provincia');
    return await proRepo.save(body);
  }

  @Roles('admin')
  @Put('province')
  async editProvince(@Body() body: Province) {
    const proRepo = getRepository(Province);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar provincia');
    return await proRepo.save(body);
  }

  @Roles('admin')
  @Delete('province/:id')
  async deleteProvince(@Param() params: IDParam) {
    const proRepo = getRepository(Province);
    const province = await proRepo.findOne(params.id)
    if (province) {
      return await proRepo.remove(province);
    }
    throw new NotFoundException('¡La provincia no existe!');
  }

  /**********************
  **********************
    CITIES ENDPOINTS
  **********************
  ***********************/

  @Get('allCities')
  async getCities() {
    const cityRepo = getRepository(City);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver ciudades');
    return await cityRepo.find();
  }

  @Get('cities/:id')
  async getCitiesByProvince(@Param() params: IDParam) {
    const cityRepo = getRepository(City);
    const proRepo = getRepository(Province);
    const province = await proRepo.findOne(params.id);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver ciudades');
    return await cityRepo.find({ where: { province: province } });
  }

  @Get('city/:id')
  async getCity(@Param() params: IDParam) {
    const cityRepo = getRepository(City);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Ver ciudad');
    return await cityRepo.findOne(params.id);
  }

  @Roles('admin')
  @Post('city')
  async createCity(@Body() body: CreateCityBody) {
    const cityRepo = getRepository(City);
    const proRepo = getRepository(Province);

    const province = await proRepo.findOne(body.province_id);
    if (province) {
      const city = new City(body.city);
      city.province = province;
      this.audit.createAccessAudit('INGRESO PANTALLA', 'Crear ciudad');
      return await cityRepo.save(city);
    }
    throw new BadRequestException('¡No existe la provincia al cuál añadirle la ciudad!');
  }

  @Roles('admin')
  @Put('city')
  async editCity(@Body() body: City) {
    const cityRepo = getRepository(City);
    this.audit.createAccessAudit('INGRESO PANTALLA', 'Editar ciudad');
    return await cityRepo.save(body);
  }

  @Roles('admin')
  @Delete('city/:id')
  async deleteCity(@Param() params: IDParam) {
    const cityRepo = getRepository(City);
    const city = await cityRepo.findOne(params.id)
    if (city) {
      return await cityRepo.remove(city);
    }
    throw new NotFoundException('¡La ciudad no existe!');
  }

  /**********************
  **********************
    DAYS ENDPOINTS
  **********************
  ***********************/

  @Get('days')
  async getDays() {
    const daysRepo = getRepository(Days);
    return await daysRepo.find();
  }

  /**********************
  **********************
    STATES ENDPOINTS
  **********************
  ***********************/

  @Get('states')
  async getStates() {
    const statesRepo = getRepository(State);
    return await statesRepo.find();
  }

  /**********************
  **********************
    ID DOCUMENT ENDPOINTS
  **********************
  ***********************/


  @Roles('admin')
  @Get('id_docs')
  async getIDDocs() {
    const idsRepo = getRepository(IdentityDocument);
    return await idsRepo.find();
  }

  @Roles('admin')
  @Get('id_doc/:id')
  async getIDDoc(@Param() params: IDParam) {
    const idRepo = getRepository(IdentityDocument);
    return await idRepo.findOne(params.id);
  }
}
