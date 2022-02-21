# Cajas API

API Rest desarrollada en NestJS y PostgreSQL. Se ha usado yarn como gestor de paquetes de Node.js pero puede ser usado npm de igual manera.

Para poder correr la API se necesita crear una base de datos con nombre `cajasapi` (o el nombre que se prefiera) que no contenga ninguna tabla ya que estas serán generadas por las migraciones más abajo.

Para configurar los datos de la conexión con Postgres se necesita editar el archivo: `ormconfig.json`.

#### Pasos para instalar y correr en modo de prueba

Ejecutar en orden los siguientes comandos luego de activar el servidor de Postgres:

1. `yarn install`
2. `yarn build`
3. `yarn migration:run`
4. `yarn seed:run`
5. `yarn run:dev`

El usuario administrador de prueba es:

email: admin@example.com

password: HoLaSoYaDoLfO2!3#23


#### API DOC

Ingresar a la url `http://localhost:3000/doc-api` para ver todos los endpoints disponibles y los datos que pueden recibir. LA DESCRIPCIÓN DE CADA UNO SIGUE EN PROCESO.



------

Este usuario se puede editar antes de instalar e instanciar la base de datos en el archivo: `src/seeds/default.seed.ts`. Este debería cumplir con las reglas de password para el perfl de administrador (aunque esto no se comprueba en el seed ya que se registra sin disparar los comandos de validación, estos solo se llaman en el controlador para la autenticación y registro en el módulo `auth`).