import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepo: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findByEmail(user: string): Promise<Usuario | null> {
    return await this.userRepo.findOne({
      where: {
        email: user,
      },
      relations: {
         produtos: true,
       }
    });
  }

  async findAll(): Promise<Usuario[]> {
    const userList = await this.userRepo.find({
       relations: {
        produtos: true,
       },
    });
    if (userList.length === 0) {
      throw new HttpException(
        'Nenhum usuário encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return userList;
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    if (!usuario)
      throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async create(user: Usuario): Promise<Usuario> {
    const buscaUser = await this.findByEmail(user.email);

    if (buscaUser)
      throw new HttpException(
        'O email cadastrado já existe!',
        HttpStatus.BAD_REQUEST,
      );

    user.senha = await this.bcrypt.criptografarSenha(user.senha);
    return await this.userRepo.save(user);
  }

  async update(user: Usuario): Promise<Usuario> {
    await this.findById(user.id);

    if (!user.id)
      throw new HttpException(
        'Id do usuário não encontrado.',
        HttpStatus.NOT_FOUND,
      );

    const buscaUser = await this.findByEmail(user.email);

    if (buscaUser && buscaUser.id !== user.id)
      throw new HttpException(
        'Usuário (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

      user.senha = await this.bcrypt.criptografarSenha(user.senha);
      return await this.userRepo.save(user);
  }
}
