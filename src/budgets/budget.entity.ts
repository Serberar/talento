import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Client } from '../clients/client.entity';
import { Work } from '../works/work.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: '12', description: 'Importe del boletín eléctrico a 12V', default: 0 })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bulletinE12V: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bulletinE230V: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bulletinG: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  certificate: number;

  @ApiProperty()
  @ManyToOne(() => Client, client => client.budgets, { eager: true, cascade: true })
  client: Client;

  @ApiProperty()
  @Column({ default: '' })
  description: string;

  @ApiProperty()
  @Column()
  user: number;

  @ApiProperty()
  @Column({ enum: ['all-terrain', 'car', 'motorbike', 'tow-vehicle'] })
  vehicle: string;

  @ApiProperty()
  @OneToMany(() => Work, work => work.budget)
  works: Work[];
}