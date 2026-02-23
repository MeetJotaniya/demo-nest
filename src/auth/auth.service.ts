import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

   async signUp(data: any) {
  data.name = data.name.toLowerCase();
  const hashedPass = await bcrypt.hash(data.password, 10);
  return this.usersService.create({ ...data, password: hashedPass });
}

  async signIn(name: string, password: string) {
  name = name.toLowerCase(); // ← add this
  const user = await this.usersService.findByName(name);

  if (!user) {
    throw new UnauthorizedException('Invalid name');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException('Invalid password');
  }

  const token = this.jwtService.sign({ id: user.id, name: user.name });

  return { message: 'Login successful', token };
}
}