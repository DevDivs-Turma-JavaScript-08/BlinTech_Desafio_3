import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  //@ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  //@ApiProperty({ example: "Nome do Usuario" })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  //@ApiProperty({ example: "email@email.com.br" })
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  //@ApiProperty()
  senha: string;

  @IsNotEmpty()
  @Column({ length: 11, nullable: false })
  cpf: string;

  @IsNotEmpty()
  @Column({ type: 'enum', enum: ["segurador", "segurado"] ,nullable: false })
  tipoDeUsuario: string;

  @Column({ length: 5000 })
  //@ApiProperty()
  foto: string;

  //@ApiProperty()
  //@OneToMany(() => Produto, (produto) => produto.usuario)
  //produto: Produto[];
}
