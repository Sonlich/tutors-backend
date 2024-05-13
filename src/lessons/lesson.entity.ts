import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Subject } from '../subjects/subject.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tutorLessons)
  @JoinColumn({ name: 'tutorId' })
  tutor: User;

  @ManyToOne(() => User, (user) => user.studentLessons)
  @JoinColumn({ name: 'studentId' })
  student: User;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @Column()
  lessonDate: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;
}
