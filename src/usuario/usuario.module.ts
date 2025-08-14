import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioService } from "./services/usuario.services";
import { UsuarioController } from "./controllers/usuario.controller";
import { AuthModule } from "../auth/auth.module";

// , forwardRef(() => AuthModule)
@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})

export class UsuarioModule {}