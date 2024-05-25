import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(decoded: any): Promise<User> {
    return this.usersRepository.findOne(decoded.id);
  }

  async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwtService.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const dbUser = await this.usersRepository.findOne({
      where: { email: signUpDto.email },
    });
    console.log(dbUser);
    if (dbUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    console.log(signUpDto.subjects);

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const user = await this.usersRepository.save({
      ...signUpDto,
      role: UserRole.Student,
      password: hashedPassword,
      subjects: signUpDto.subjects,
    });

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}
