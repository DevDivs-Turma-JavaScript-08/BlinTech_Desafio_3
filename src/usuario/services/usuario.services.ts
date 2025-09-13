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
      },
    });
  }

  async findByCpf(user: string): Promise<Usuario | null> {
    return await this.userRepo.findOne({
      where: {
        cpf: user,
      },
      relations: {
        produtos: true,
      },
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
    const buscaUserEmail = await this.findByEmail(user.email);
    const buscaUserCpf = await this.findByCpf(user.cpf);

    if (buscaUserEmail)
      throw new HttpException(
        'O email cadastrado já existe!',
        HttpStatus.BAD_REQUEST,
      );

    if (buscaUserCpf)
      throw new HttpException(
        'O CPF cadastrado já existe!',
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

    const buscaUserEmail = await this.findByEmail(user.email);
    const buscaUserCpf = await this.findByEmail(user.cpf);

    if (buscaUserEmail && buscaUserEmail.id !== user.id)
      throw new HttpException('E-mail já cadastrado!', HttpStatus.BAD_REQUEST);

    if (buscaUserCpf && buscaUserCpf.id !== user.id)
      throw new HttpException('CPF já cadastrado!', HttpStatus.BAD_REQUEST);

    user.senha = await this.bcrypt.criptografarSenha(user.senha);
    return await this.userRepo.save(user);
  }
}
