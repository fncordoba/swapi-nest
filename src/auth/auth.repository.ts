import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    
      const user = this.repository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
    await this.repository.save(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { email },
      select: ['email', 'password', 'id'], 
    });
  }
}