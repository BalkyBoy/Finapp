import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() body: { fullName: string; email: string; password: string }
  ) {
    const { fullName, email, password } = body;
    return this.authService.signup(fullName, email, password);
  }

  
@Post('google')
async loginWithFirebase(@Body('firebaseIdToken') idToken: string) {
  return this.authService.signInWithFirebase(idToken);
}

}

