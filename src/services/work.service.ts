import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from '../entities/work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
  ) {}

  async findAllWorks(): Promise<Work[]> {
    console.log('called findAllWorks');
    
    return this.workRepository.find();
  }

  async findWorkById(id: number): Promise<Work> {
    const work = await this.workRepository.findOne({ where: { id } }); 
    if (!work) {
      throw new NotFoundException('Work not found');
    }
    return work;
  }

  async findWorksByVehicle(name: string): Promise<Work[]> {
    return this.workRepository
      .createQueryBuilder('work')
      .innerJoin('work.section', 'section')
      .where('section.vehicle = :name', { name })
      .getMany();
  }

  async createWork(work: Work): Promise<Work> {
    return this.workRepository.save(work);
  }

  async updateWork(id: number, work: Work): Promise<Work> {
    await this.findWorkById(id); // Check if work exists
    return this.workRepository.save({ ...work, id });
  }

  async removeWork(id: number): Promise<void> {
    await this.findWorkById(id); // Check if work exists
    await this.workRepository.softDelete(id);
  }

  async restoreWork(id: number): Promise<void> {
    await this.workRepository.restore(id);
  }
}
