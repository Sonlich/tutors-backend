import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}
  getAllSubjects(userId: number) {
    return this.subjectRepository.find({ where: { tutor: { id: userId } } });
  }

  createSubject(dto: CreateSubjectDto, tutorId: number) {
    return this.subjectRepository.save({ ...dto, tutor: { id: tutorId } });
  }

  createSubjects(dto: CreateSubjectDto[], tutorId: number) {
    return this.subjectRepository.save({ ...dto, tutor: { id: tutorId } });
  }

  updateSubject(dto: CreateSubjectDto, tutorId: number, id: string) {
    return this.subjectRepository.save({
      ...dto,
      tutor: { id: tutorId },
      id: Number(id),
    });
  }

  deleteSubject(tutorId: number, id: string) {
    return this.subjectRepository.delete({
      id: Number(id),
      tutor: { id: tutorId },
    });
  }
}
