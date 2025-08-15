import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'Nome do Usuario' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'Minimo de 6 caracteres' })
  senha: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({ example: '12345678910' })
  @Column({ length: 11, nullable: false, unique: true })
  cpf: string;

  @ApiProperty({ example: 'Segurado' })
  // @Column({
  //   type: 'enum',
  //   enum: ['Segurador', 'Segurado'],
  //   default: 'Segurado',
  // })
  @IsNotEmpty()
  @Column({ length: 255, nullable: true, default: 'Segurado' })
  tipoDeUsuario: string;

  @Column({ length: 5000 })
  @ApiProperty({ example: 'www.foto.com.br' })
  foto: string;

  @ApiProperty({ readOnly: true })
  @OneToMany(() => Produto, (produtos) => produtos.usuario)
  produtos: Produto[];
}
