import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: number;

  @Column()
  dayOfWeek: string; // e.g., "Monday", "Tuesday"

  @Column()
  startTime: string; // e.g., "09:00"

  @Column()
  endTime: string;   // e.g., "17:00"
}
