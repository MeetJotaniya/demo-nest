import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    findByName(name: string) {
      return this.userRepo.findOneBy({
        name,
      }); 
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id,updateUserDto);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
