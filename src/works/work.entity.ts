import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Section } from './section.entity';
import { Budget } from '../budgets/budget.entity'; 
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Elemento', description: 'Texto descriptivo del elemento'})
  @Column({ default: '' })
  description: string;

  @ApiProperty({example: 'Nombre del elemento', description: 'Nombre visualizado en frontal'})
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price1: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price2: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price3: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price4: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  priceGapMod: number;

  @ApiProperty()
  @ManyToOne(() => Section, section => section.works, { nullable: true })
  section: Section;

  @ApiProperty()
  @ManyToOne(() => Budget, budget => budget.works, { nullable: true }) 
  budget: Budget; 

}
