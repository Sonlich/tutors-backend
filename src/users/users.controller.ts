import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from './interfaces/roles.enum';
import { GetUser } from '../decorators/get-user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.Any)
  @ApiBearerAuth()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('me')
  @Roles(RolesEnum.Any)
  @ApiBearerAuth()
  getMe(@GetUser() user: User) {
    return this.usersService.getUserByID(user.id);
  }

  @Get('tutors')
  @ApiBearerAuth()
  async getAllTutors(): Promise<User[]> {
    return await this.usersService.getAllTutors();
  }

  @Get(':id')
  async getUserByID(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserByID(Number(id));
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserById(Number(id));
  }

  @Patch('profile')
  async updateUser(@GetUser() user, @Body() createUserDto: CreateUserDto) {
    return this.usersService.updateUser(Number(user.id), createUserDto);
  }
}
