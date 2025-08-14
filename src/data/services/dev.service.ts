import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Produto } from "../../produto/entities/produto.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql', 
      host: this.config.get<string>("DB_HOST"),
      port: this.config.get<number>("DB_PORT"),
      username: this.config.get<string>("DB_USERNAME"),
      password: this.config.get<string>("DB_PASSWORD"),
      database: this.config.get<string>("DB_NAME"),
      entities: [ Usuario, Produto, Categoria ],
      synchronize: true,
      logging: true,
    }
  }
}