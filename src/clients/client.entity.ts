import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Budget } from '../budgets/budget.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  description: string;

  @Column({ unique: true, nullable: true })
  email: string; 

  @Column({ default: '' })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ enum: ['particular', 'empresa'] })
  type: string;

  @OneToMany(() => Budget, budget => budget.client)
  budgets: Budget[];

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}