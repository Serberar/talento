import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BudgetController } from './budgets.controller';
import { BudgetService } from './budget.service';
import { budgetsProviders } from './budgets.providers';
import { clientProviders } from '../clients/clients.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [BudgetController],
    providers: [...budgetsProviders, ...clientProviders, BudgetService],
  })
  export class BudgetsModule {}
