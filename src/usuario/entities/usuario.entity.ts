import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
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
  @ApiProperty({ example: 'Minimo de 6 caracteres'})
  senha: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({ example: '12345678910'})
  @Column({ nullable: false })
  cpf: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['Segurador', 'Segurado'],
    default: 'Segurado',
  })
  // @Column({ length: 255, nullable: true })
  tipoDeUsuario: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @ApiProperty()
  @OneToMany(() => Produto, (produtos) => produtos.usuario)
  produtos: Produto[];
}
