import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { Work } from '../entities/work.entity';
import { WorkService } from '../services/work.service';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async findAll(): Promise<Work[]> {
    console.log('Se ha llamado a la función findAll');
    return this.workService.findAllWorks();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Work> {
    const work = await this.workService.findWorkById(id);
    if (!work) {
      throw new NotFoundException('Work not found');
    }
    return work;
  }

  @Get('vehicle/:name')
  async findByVehicle(@Param('name') name: string): Promise<Work[]> {
    return this.workService.findWorksByVehicle(name);
  }

  @Post()
  async create(@Body() work: Work): Promise<Work> {
    return this.workService.createWork(work);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() work: Work): Promise<Work> {
    return this.workService.updateWork(id, work);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.workService.removeWork(id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<void> {
    await this.workService.restoreWork(id);
  }
}
