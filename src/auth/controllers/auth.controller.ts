import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { EmailLogin } from "../entities/emaillogin.entity";

@ApiTags("Usuario")
@Controller("/usuarios")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("/login")
  login(@Body() usuario: EmailLogin): Promise<any> {
    return this.authService.login(usuario);
  }
}