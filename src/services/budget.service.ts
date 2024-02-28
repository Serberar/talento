import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from '../entities/budget.entity';
import { Client } from '../entities/client.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAllBudgets(): Promise<Budget[]> {
    return this.budgetRepository.find();
  }

  async findBudgetById(id: number): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({ where: { id } }); 
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return budget;
  }

  async createBudget(budget: Budget, userId: number): Promise<Budget> {
    if (!budget.client) {
      throw new NotFoundException('Client information is required');
    }

    let client = await this.clientRepository.findOne({ where: { email: budget.client.email } });
    if (!client) {
      // Create client if not exists
      client = await this.clientRepository.save(budget.client);
    }
    
    budget.client = client;
    // Set user ID
    budget.user = userId;
    return this.budgetRepository.save(budget);
  }

  async updateBudget(id: number, budget: Budget): Promise<Budget> {
    await this.findBudgetById(id); // Check if budget exists
    return this.budgetRepository.save({ ...budget, id });
  }

  async removeBudget(id: number): Promise<void> {
    await this.findBudgetById(id); // Check if budget exists
    await this.budgetRepository.softDelete(id);
  }

  async restoreBudget(id: number): Promise<void> {
    await this.budgetRepository.restore(id);
  }

  async findLastBudgets(days: number): Promise<Budget[]> {
    const lastDate = new Date();
    lastDate.setDate(lastDate.getDate() - days);
    return this.budgetRepository
      .createQueryBuilder('budget')
      .where('budget.createdAt >= :lastDate', { lastDate })
      .getMany();
  }
}
