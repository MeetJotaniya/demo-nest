import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    async findByName(name: string) {
  return this.userRepo
    .createQueryBuilder('user')
    .where('LOWER(user.name) = LOWER(:name)', { name })
    .getOne();
}


   constructor( 
    @InjectRepository(User) 
      private userRepo: Repository<User>, 
    ) {} 

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  if (updateUserDto.password) {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
  }

  await this.userRepo.update(id, updateUserDto);

  return this.userRepo.findOneBy({ id });
}

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
