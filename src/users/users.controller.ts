import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/user.dto';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesEnum } from './interfaces/roles.enum';
import { CurrentUser } from '../utils/current-user';
import { CurrentUserInterceptor } from './user.interseptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.Any)
  @ApiBearerAuth()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserByID(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserByID(Number(id));
  }

  @Get('me')
  @UseInterceptors(CurrentUserInterceptor)
  getMe(@CurrentUser() user: User) {
    return this.usersService.getUserByID(user.id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserById(Number(id));
  }
}
