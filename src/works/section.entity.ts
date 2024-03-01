import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Work } from './work.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: '' })
  description: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: ['all-terrain', 'car', 'motorbike', 'tow-vehicle'] })
  vehicle: string;

  @ApiProperty()
  @OneToMany(() => Work, work => work.section)
  works: Work[];
  
}
