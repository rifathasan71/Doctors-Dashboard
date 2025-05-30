import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class LabResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  testType: string;

  @Column('text')
  resultSummary: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @Column({ nullable: true })
  doctorNotes: string;
}
