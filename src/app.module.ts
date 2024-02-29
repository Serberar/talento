import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ConfigModule } from '@nestjs/config';
import { WorksModule } from './works/works.module';
import { BudgetsModule } from './budgets/budgets.module';
import { SectionsModule } from './sections/sections.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    WorksModule,
    BudgetsModule,
    SectionsModule,
    ClientsModule
  ],
  controllers: [
  ],
  providers: [
    Logger,
  ],
})
export class AppModule {}
