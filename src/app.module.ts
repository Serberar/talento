import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ConfigModule } from '@nestjs/config';
import { WorksModule } from './works/works.module';
import { BudgetsModule } from './budgets/budgets.module';
import { SectionsModule } from './sections/sections.module';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WorksModule,
    BudgetsModule,
    SectionsModule,
    ClientsModule,
    DatabaseModule
  ],
  controllers: [
  ],
  providers: [
    Logger,
  ],
})
export class AppModule {}
