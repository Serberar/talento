import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Client } from '../clients/client.entity';
import { Work } from '../works/work.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bulletinE12V: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bulletinE230V: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bulletinG: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  certificate: number;

  @ManyToOne(() => Client, client => client.budgets, { eager: true, cascade: true })
  client: Client;

  @Column({ default: '' })
  description: string;

  @Column()
  user: number;

  @Column({ enum: ['all-terrain', 'car', 'motorbike', 'tow-vehicle'] })
  vehicle: string;

  @OneToMany(() => Work, work => work.budget)
  works: Work[];
}