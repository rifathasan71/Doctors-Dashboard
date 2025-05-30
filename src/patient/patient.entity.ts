import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  diagnosis: string;

  @Column({ nullable: true })
  prescription: string;

  @Column({ nullable: true })
  treatment_plan: string;

  @Column({ nullable: true })
  progress_notes: string;

  @Column({ type: 'timestamp', nullable: true })
  next_appointment: Date;

  @Column({ type: 'int', default: 0 })
  discount_percentage: number;
}
