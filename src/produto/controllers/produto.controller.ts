import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.services";
import { Produto } from "../entities/produto.entity";


@Controller("/produto")
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id)
    }

    @Get('/produto/:nome')
    @HttpCode(HttpStatus.OK)
    findAllBycategoria(@Param('nome') nome: string): Promise<Produto[]> {
        return this.produtoService.findAllByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() medicamento: Produto): Promise<Produto> {
        return this.produtoService.create(medicamento);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() medicamento: Produto) : Promise<Produto> {
        return this.produtoService.update(medicamento);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtoService.delete(id)
    }

}