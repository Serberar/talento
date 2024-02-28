import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, Logger], // Agregar Logger como provider
})
export class AppModule {}
