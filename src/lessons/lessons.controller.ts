import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { Lesson } from './lesson.entity';
import { LessonCreateDto } from './dto/lesson.create.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  // lesson.entity CRUD

  @Get()
  async getAllLessons(): Promise<Lesson[]> {
    return await this.lessonsService.getAllLessons();
  }

  @Post()
  async createLesson(@Body() createLessonDto: LessonCreateDto) {
    return await this.lessonsService.createLesson(createLessonDto);
  }

  @Patch(':id')
  async updateLesson(
    @Param('id') id: string,
    @Body() createLessonDto: LessonCreateDto,
  ) {
    return await this.lessonsService.updateLesson(Number(id), createLessonDto);
  }

  @Delete(':id')
  async deleteLesson(@Param('id') id: string) {
    return await this.lessonsService.deleteLesson(Number(id));
  }
}
