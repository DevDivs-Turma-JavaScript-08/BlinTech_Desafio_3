import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "../services/auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(email: string, senha: string): Promise<any> {
    const validaEmail = await this.authService.validateEmail(email, senha);
    if (!validaEmail) {
      throw new UnauthorizedException('Email e/ou senha incorretos!');
    }
    return validaEmail;
  }
}