# Talento · Microservicio de presupuestos (NestJS)

Copia del microservicio de [presupuestos](https://github.com/Serberar/presupuestos): API REST para **gestionar presupuestos de un taller de vehículos** (trabajos por secciones, presupuestos y clientes) con NestJS, TypeORM, MySQL y Swagger. El código es el mismo; esta copia trae además la configuración de ESLint y Prettier.

## Recursos

| Recurso | Endpoints |
|---|---|
| **Works** (trabajos) | `GET /works`, `GET /works/:id`, `GET /works/vehicle/:name`, `POST /works`, `PATCH /works/:id`, `DELETE /works/:id`, `PATCH /works/restore/:id` |
| **Budgets** (presupuestos) | `GET /budgets`, `GET /budgets/:id`, `GET /budgets/last/:days`, `POST /budgets`, `PATCH /budgets/:id`, `DELETE /budgets/:id`, `PATCH /budgets/restore/:id` |
| **Clients** | `GET /clients` |

- **Trabajos:** cada uno pertenece a una sección (asociada a un tipo de vehículo) y tiene varios precios.
- **Presupuestos:** agrupan trabajos e importes como boletines eléctricos (12 V y 230 V), boletín de gas y certificado de taller.
- El borrado es lógico (`deletedAt`): lo borrado se recupera con `PATCH .../restore/:id`.
- `GET /budgets/last/:days` devuelve los presupuestos de los últimos N días.
- La migración `src/migrations/1709140841155-initialWorksData.ts` carga los trabajos iniciales desde `initialWorks.json`.

## Documentación interactiva

Con el servidor arrancado, abre **http://localhost:3000/api** para ver y probar los endpoints en Swagger.

## Cómo arrancarlo

1. Ten una base de datos **MySQL** y crea un `.env`:

   ```
   DB_TYPE=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=usuario
   DB_PASSWORD=contraseña
   DB_DATABASE=presupuestos
   ```

2. Instala y arranca:

   ```bash
   npm install
   npm run start:dev
   ```

## Tecnologías

NestJS, TypeScript, TypeORM, MySQL y Swagger.

## Autor

Sergio Bernabé
