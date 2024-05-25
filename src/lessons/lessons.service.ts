import { Injectable } from '@nestjs/common';
import { Lesson, LessonStatus } from './lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonCreateDto } from './dto/lesson.create.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  getAllLessons() {
    return this.lessonRepository.find();
  }

  createLesson(createLessonDto: LessonCreateDto) {
    return this.lessonRepository.save({
      ...createLessonDto,
      status: LessonStatus.WaitingApproval,
      tutor: { id: createLessonDto.tutorId },
    });
  }

  updateLesson(id: number, createLessonDto: LessonCreateDto) {
    return this.lessonRepository.update(id, createLessonDto);
  }

  deleteLesson(id: number) {
    return this.lessonRepository.delete(id);
  }

  getLessonById(id: number) {
    return this.lessonRepository.findOne({ where: { id } });
  }
}
