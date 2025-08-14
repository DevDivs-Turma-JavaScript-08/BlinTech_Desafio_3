import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-strategy";
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private _emailField: string;
  private _passwordField: string;

  constructor(private readonly authService: AuthService) {
    super();
    this._emailField = "email";
    this._passwordField = "senha"
  }

  async validate(email: string, senha: string): Promise<any> {
    const validaEmail = await this.authService.validateEmail(email, senha);
    if (!validaEmail) {
      throw new UnauthorizedException("Usuário e/ou senha incorretos!");
    }
    return validaEmail;
  }

}