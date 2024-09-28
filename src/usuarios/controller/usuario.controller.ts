import { Controller, Get, HttpCode, HttpStatus, Injectable, Post, Query } from "@nestjs/common";
import { PostUsuarioService } from "../postUsuario/services/postUsuario.service";
import { GetUsuarioService } from "../getUsuarios/service/getUsuario.service";
import { GetUsuarioOutputDto } from "../getUsuarios/dto/getUsuarioOutput.dto";
import { PostUsuarioInputDto } from "../postUsuario/dtos/postUsuarioInput.dto";
import { GetUsuarioByEmailService } from "../getUsuarioByEmail/service/getUsuarioByEmail.service";
import { GetUsuarioByEmailInputDto } from "../getUsuarioByEmail/dtos/GetUsuarioByEmailInput.dto";


@Injectable()
@Controller()
export class UsuarioController {

    constructor(private readonly postUsuario: PostUsuarioService, 
        private readonly getUsuarios: GetUsuarioService,
        private readonly getUsuariosByEmail: GetUsuarioByEmailService) {}

    @Get()
    async GetUsuarios(): Promise<GetUsuarioOutputDto[]> {
        return await this.getUsuarios.exec()
    }

    @Get('/email')
    async GetUsuarioByEmail(@Query() data: GetUsuarioByEmailInputDto): Promise<GetUsuarioOutputDto> {
        return this.getUsuariosByEmail.exec(data);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async PostUsuarios(@Query() dto: PostUsuarioInputDto) {
        return await this.postUsuario.exec(dto);
    }


}