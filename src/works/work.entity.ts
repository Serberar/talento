import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Section } from '../sections/section.entity';
import { Budget } from '../budgets/budget.entity'; 

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  description: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price1: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price2: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price3: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price4: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  priceGapMod: number;

  @ManyToOne(() => Section, section => section.works, { nullable: true })
  section: Section;

  @ManyToOne(() => Budget, budget => budget.works, { nullable: true }) 
  budget: Budget; 

  // Auditoría
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
