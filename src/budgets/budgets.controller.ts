import { Controller, Get, Post, Patch, Delete, Param, Body, Req, NotFoundException } from '@nestjs/common';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';

@Controller('budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async findAll(): Promise<Budget[]> {
    return this.budgetService.findAllBudgets();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Budget> {
    const budget = await this.budgetService.findBudgetById(id);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return budget;
  }

  @Post()
  async create(@Body() budget: Budget, @Req() req): Promise<Budget> {
    const userId = req.headers['th-user'];
    return this.budgetService.createBudget(budget, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() budget: Budget): Promise<Budget> {
    return this.budgetService.updateBudget(id, budget);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.budgetService.removeBudget(id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<void> {
    await this.budgetService.restoreBudget(id);
  }

  @Get('last/:days')
  async findLastBudgets(@Param('days') days: number): Promise<Budget[]> {
    return this.budgetService.findLastBudgets(days);
  }
}
