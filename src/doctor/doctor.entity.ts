import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  degree: string;

  @Column()
  specialization: string;

  @Column({ default: false })
  isApproved: boolean;
}
