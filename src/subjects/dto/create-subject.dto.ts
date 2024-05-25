import { IsNotEmpty, IsEnum, IsNumber, IsDate } from 'class-validator';
import { SubjectName } from '../subject.entity';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsEnum(SubjectName)
  name: SubjectName;

  @IsNotEmpty()
  @IsNumber()
  pricePerLesson: number;

  @IsNotEmpty()
  @IsDate()
  experienceSince: Date;
}
