import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Work } from './work.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  description: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'enum', enum: ['all-terrain', 'car', 'motorbike', 'tow-vehicle'] })
  vehicle: string;

  @OneToMany(() => Work, work => work.section)
  works: Work[];

  // Auditoría
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
