import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WorkController } from './controllers/work.controller';
import { ClientController } from './controllers/client.controller';
import { BudgetController } from './controllers/budgets.controller';
require('dotenv').config();


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
  ],
  controllers: [
    AppController, 
    WorkController, 
    ClientController, 
    BudgetController
  ],
  providers: [
    AppService, 
    Logger,
  ],
})
export class AppModule {}
