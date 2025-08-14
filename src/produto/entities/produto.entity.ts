import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: "tb_produto" })
export class Produto {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nomeProduto: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    descricao: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    cobertura: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    imei: string

    @ApiProperty()
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    valorProduto: number;

    @ApiProperty()
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    valorSeguro: number;

    @ApiProperty() 
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    premioMensal: number;
    
    @ApiProperty()
    @Column()
    tempoUso: number;

    @ApiProperty({ type: () => Categoria})
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'categoria_id'})
    categoria: Categoria; 

     @ApiProperty({type: () => Usuario})
    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

}
