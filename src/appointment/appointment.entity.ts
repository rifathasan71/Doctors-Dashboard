import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: number;

  @Column()
  patientName: string;

  @Column()
  reason: string;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';

  @CreateDateColumn()
  createdAt: Date;
}
