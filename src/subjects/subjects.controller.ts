import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Subject } from './subject.entity';
import { SubjectsService } from './subjects.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from '../users/interfaces/roles.enum';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}
  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.Tutor)
  async getAllSubjects(@GetUser() user: User): Promise<Subject[]> {
    return await this.subjectsService.getAllSubjects(user.id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(RolesEnum.Tutor)
  async createSubject(
    @GetUser() user: User,
    dto: CreateSubjectDto,
  ): Promise<Subject> {
    return await this.subjectsService.createSubject(dto, user.id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Tutor)
  async updateSubject(
    @GetUser() user: User,
    dto: CreateSubjectDto,
    @Param('id') id: string,
  ): Promise<Subject> {
    return await this.subjectsService.updateSubject(dto, user.id, id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Tutor)
  async deleteSubject(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    return await this.subjectsService.deleteSubject(user.id, id);
  }
}
