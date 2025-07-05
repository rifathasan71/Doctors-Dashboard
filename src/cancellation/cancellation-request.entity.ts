import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class CancellationRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: number;

  @Column({ nullable: true })
  targetDate: string; 

  @Column({ nullable: true })
  appointmentId: number; 

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Column({ nullable: true })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  approvedAt: Date;
}
