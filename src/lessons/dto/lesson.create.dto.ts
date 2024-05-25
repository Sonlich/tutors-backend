import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LessonCreateDto {
  @IsDate()
  @IsNotEmpty()
  dateStart: Date;

  @IsDate()
  @IsNotEmpty()
  dateFinish: Date;

  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsNumber()
  tutorId: number;
}
