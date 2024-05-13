import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lesson } from '../lessons/lesson.entity';
import { Subject } from '../subjects/subject.entity';

export enum UserRole {
  Tutor = 'Tutor',
  Student = 'Student',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Lesson, (lesson) => lesson.tutor)
  tutorLessons: Lesson[];

  @OneToMany(() => Lesson, (lesson) => lesson.student)
  studentLessons: Lesson[];

  @OneToMany(() => Subject, (subject) => subject.tutor)
  tutorSubject: Lesson[];

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
  photo: string;

  @Column()
  birthDate: Date;

  @Column()
  description: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
