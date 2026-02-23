import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signIn(@Body() body) {
  return this.authService.signIn(body.name, body.password);
}

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}