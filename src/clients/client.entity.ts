import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Budget } from '../budgets/budget.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Cliente Preferente', description: 'Texto descriptivo del cliente'})
  @Column({ default: '' })
  description: string;

  @ApiProperty({example: 'cliente@domain.com', description: 'Correo electrónico del cliente'})
  @Column({ unique: true, nullable: true })
  email: string; 

  @ApiProperty()
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