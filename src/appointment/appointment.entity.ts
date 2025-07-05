import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: number;

  @Column({nullable: true})
  patientName?: string;

  @Column()
  reason: string;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;
  @Column({ default: 0 })
  fee: number;

  @Column({ type: 'int', default: 0 })
discount_percentage: number;


}
