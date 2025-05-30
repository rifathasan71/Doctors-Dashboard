import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class TreatmentMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  sender: string; // e.g., "doctor"

  @Column('text')
  content: string;

  @CreateDateColumn()
  timestamp: Date;
}
