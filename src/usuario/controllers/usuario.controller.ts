import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from '../services/usuario.services';
import { Usuario } from '../entities/usuario.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Usuario')
@Controller('/usuarios')
@ApiBearerAuth()
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.userService.findById(id);
  }

  @Post('/cadastro')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: Usuario): Promise<Usuario> {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizacao')
  @HttpCode(HttpStatus.OK)
  async update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.userService.update(usuario);
  }
}
