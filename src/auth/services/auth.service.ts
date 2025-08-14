import { JwtService } from "@nestjs/jwt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsuarioService } from "../../usuario/services/usuario.services";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateEmail (email: string, password: string): Promise<any> {
    const buscaEmail = await this.userService.findByEmail(email);

    if (!buscaEmail)
      throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenhas(
      password,
      buscaEmail.senha,
    );

    if (buscaEmail && matchPassword ) {
      const { senha, ...resposta } = buscaEmail;
      return resposta;
    }

    return null;
  }

  async login(emailLogin: EmailLogin) {
    const payload = { sub: emailLogin.email};

    const buscaEmail = await this.userService.findByEmail(
      emailLogin.usuario, 
    );

    if (!buscaEmail)
      throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);

    return {
      id: buscaEmail.id,
      nome: buscaEmail.nome,
      tipoDeUsuario: buscaEmail.tipoDeUsuario,
      email: buscaEmail.email,
      cpf: buscaEmail.cpf,
      senha: "",
      foto: buscaEmail.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}