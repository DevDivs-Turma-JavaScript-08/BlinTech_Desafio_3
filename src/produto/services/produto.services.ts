import { CategoriaService } from './../../categoria/services/categoria.services';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Like, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";




@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>, 
        private categoriaService: CategoriaService,

    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true,
                usuario: true,
            }
        });
    }

    async findById(id: number): Promise<Produto> {

        const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
             relations: {
                categoria: true,
                usuario: true,
            }
        })

        if (!produto) throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)
        
        return produto;
    }

    async findAllByNome(nomeProduto: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nomeProduto: Like(`%${nomeProduto}%`)
            },
             relations: {
                categoria: true,
                usuario: true,
            }
        })
    }

    async createValorFinal(produto: Produto): Promise<Produto> {
        let porcentagemBase = 2.15

        if(produto.cobertura == "premium") {
          porcentagemBase = 2.3
        } else if(produto.cobertura == "intermediario") {
          porcentagemBase = 2.2
        }

        produto.valorSeguro = produto.valorProduto*porcentagemBase

        if(produto.tempoUso >= 3) produto.valorSeguro = produto.valorSeguro * 0.7

        return await this.produtoRepository.save(produto);
    }

    async create(produto: Produto): Promise<Produto> {

        this.createValorFinal(produto)

        produto.premioMensal = produto.valorSeguro * 0.005

        return await this.produtoRepository.save(produto)
    }

    async update(produto: Produto): Promise<Produto> {

        const postagem_id = await this.findById(produto.id);
        await this.categoriaService.findById(produto.categoria.id);
        if (!postagem_id) {
            throw new HttpException("Produto não encontrado", HttpStatus.NOT_FOUND);
        }

        this.createValorFinal(produto);

        produto.premioMensal = produto.valorSeguro * 0.005;
        
        return await this.produtoRepository.save(produto);
    }

    async delete (id: number): Promise < DeleteResult > {
        await this.findById(id)

        return await this.produtoRepository.delete(id)
}

}