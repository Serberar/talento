import { Controller, Get } from '@nestjs/common';
import { Client } from './client.entity';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAllClients();
  }
}
