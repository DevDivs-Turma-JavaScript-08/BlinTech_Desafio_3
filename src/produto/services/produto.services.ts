import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Like, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";




@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>, 

    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find();
    }

    async findById(id: number): Promise<Produto> {

        const produto = await this.produtoRepository.findOne({
            where: {
                id
            }
        })

        if (!produto) throw new HttpException('produto nao encontrada', HttpStatus.NOT_FOUND)
        
        return produto;
    }

    async findAllByNome(nomeProduto: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nomeProduto: Like(`%${nomeProduto}%`)
            }
        })
    }

    async createValorFinal(produto: Produto): Promise<Produto> {
        let porcentagemBase = 0.15

        if(produto.cobertura == "premium")porcentagemBase = 0.3
        
        if(produto.cobertura == "intermediario")porcentagemBase = 0.2

        produto.valorSeguro = produto.valorProduto*porcentagemBase

        if(produto.tempoUso >= 3) produto.valorSeguro = produto.valorSeguro - (produto.valorSeguro*0.3)

        return await this.produtoRepository.save(produto);
    }

    async create(produto: Produto): Promise<Produto> {

        this.createValorFinal(produto)

        return await this.produtoRepository.save(produto)
    }

    async update(produto: Produto): Promise<Produto> {

        const postagem_id = await this.findById(produto.id);
        if (!postagem_id) {
            throw new HttpException("produto não encontrada", HttpStatus.NOT_FOUND);
        }
        
        return await this.produtoRepository.save(produto);
    }

    async delete (id: number): Promise < DeleteResult > {
        await this.findById(id)

        return await this.produtoRepository.delete(id)
}

}