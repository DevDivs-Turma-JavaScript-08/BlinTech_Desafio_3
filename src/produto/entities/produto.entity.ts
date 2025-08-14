import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_produto" })
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nomeProduto: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    descricao: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    cobertura: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    imei: string

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    valorProduto: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    valorSeguro: number;

     @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    premioMensal: number;
    
    @Column()
    tempoUso: number;
}
