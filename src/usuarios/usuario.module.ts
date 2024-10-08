import { Module } from "@nestjs/common";
import { UsuarioController } from "./controller/usuario.controller";
import { GetUsuarioService } from "./getUsuarios/service/getUsuario.service";
import { PostUsuarioService } from "./postUsuario/services/postUsuario.service";
import { DatabaseService } from "src/shared/database/Database.service";
import { PostUsuarioRepository } from "./postUsuario/repositories/postUsuario.repository";
import { GetUsuarioRepository } from "./getUsuarios/repositories/getUsuario.repository";
import { GetUsuarioByEmailService } from "./getUsuarioByEmail/service/getUsuarioByEmail.service";
import { GetUsuarioByEmailRepository } from "./getUsuarioByEmail/repositories/getUsuarioByEmail.repository";
import { UpdateUsuarioService } from "./updateUsuarios/service/updateUsuario.service";
import { UpdateUsuarioRepository } from "./updateUsuarios/repositories/updateUsuario.repository";


@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [PostUsuarioService, GetUsuarioService, DatabaseService,PostUsuarioRepository, GetUsuarioRepository, GetUsuarioByEmailService, GetUsuarioByEmailRepository,UpdateUsuarioService, UpdateUsuarioRepository],
    exports: [PostUsuarioService, GetUsuarioService, GetUsuarioByEmailService,UpdateUsuarioService]
})

export class UsuarioModule {}