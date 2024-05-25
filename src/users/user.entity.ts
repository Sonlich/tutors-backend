import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lesson } from '../lessons/lesson.entity';
import { Subject } from '../subjects/subject.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
  Tutor = 'Tutor',
  Student = 'Student',
}

interface DaySchedule {
  active: boolean;
  from: string;
  to: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column()
  description: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profilePhoto?: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'jsonb', nullable: true })
  schedule: {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
  };

  @OneToMany(() => Lesson, (lesson) => lesson.tutor)
  tutorLessons: Lesson[];

  @OneToMany(() => Lesson, (lesson) => lesson.student)
  studentLessons: Lesson[];

  @OneToMany(() => Subject, (subject) => subject.tutor)
  tutorSubject: Lesson[];

  @OneToMany(() => Subject, (subject) => subject.tutor, { cascade: true })
  subjects: Subject[];
}
