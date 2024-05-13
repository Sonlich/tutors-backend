import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum SubjectName {
  Mathematics = 'Mathematics',
  Chemistry = 'Chemistry',
  English = 'English',
}

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tutorSubject)
  @JoinColumn({ name: 'tutorId' })
  tutor: User;

  @Column({
    type: 'enum',
    enum: SubjectName,
  })
  name: SubjectName;

  @Column()
  pricePerLesson: number;

  @Column()
  experienceSince: Date;
}
