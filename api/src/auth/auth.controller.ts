
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  // Login an existing user
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }
}
