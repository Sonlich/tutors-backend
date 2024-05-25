import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Subject } from '../subjects/subject.entity';

export enum LessonStatus {
  WaitingApproval = 'WaitingApproval',
  Scheduled = 'Scheduled',
  Canceled = 'Canceled',
}

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
  dateStart: Date;

  @Column()
  dateFinish: Date;

  @Column({
    type: 'enum',
    enum: LessonStatus,
    default: LessonStatus.WaitingApproval,
  })
  status: LessonStatus;
}
