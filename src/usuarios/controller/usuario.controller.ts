import { Controller, Get, HttpCode, HttpStatus, Injectable, Post, Put, Query } from "@nestjs/common";
import { PostUsuarioService } from "../postUsuario/services/postUsuario.service";
import { GetUsuarioService } from "../getUsuarios/service/getUsuario.service";
import { GetUsuarioOutputDto } from "../getUsuarios/dto/getUsuarioOutput.dto";
import { PostUsuarioInputDto } from "../postUsuario/dtos/postUsuarioInput.dto";
import { GetUsuarioByEmailService } from "../getUsuarioByEmail/service/getUsuarioByEmail.service";
import { GetUsuarioByEmailInputDto } from "../getUsuarioByEmail/dtos/GetUsuarioByEmailInput.dto";
import { UpdateUsuarioInputDto } from "../updateUsuarios/dto/updateUsuario.dto";
import { UpdateUsuarioService } from "../updateUsuarios/service/updateUsuario.service";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";


@Injectable()
@Controller()
export class UsuarioController {

    constructor(private readonly postUsuario: PostUsuarioService, 
        private readonly getUsuarios: GetUsuarioService,
        private readonly getUsuariosByEmail: GetUsuarioByEmailService,
        private readonly updateUsuario: UpdateUsuarioService) {}

    @Get()
    @ApiTags('users')
    @ApiOperation({summary: 'listar todos os usuarios'})
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
    async GetUsuarios(): Promise<GetUsuarioOutputDto[]> {
        return await this.getUsuarios.exec()
    }

    @Get('/email')
    @ApiTags('users')
    @ApiOperation({summary: 'buscar usuario por email'})
    @ApiResponse({status: 200, description: 'Usuario retornado com sucesso'})
    async GetUsuarioByEmail(@Query() data: GetUsuarioByEmailInputDto): Promise<GetUsuarioOutputDto> {
        return this.getUsuariosByEmail.exec(data);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiTags('users')
    @ApiOperation({summary: 'Insere um novo usuario no banco de dados'})
    @ApiResponse({status: 201, description: 'Usuario inserido com sucesso'})
    @ApiQuery({description: 'Dados necessários para salvar um novo usuario', type: PostUsuarioInputDto})
    async PostUsuarios(@Query() dto: PostUsuarioInputDto) {
        return await this.postUsuario.exec(dto);
    }

    @Put()
    async UpdateUser(@Query() dto: UpdateUsuarioInputDto) {

        return await this.updateUsuario.exec(dto);

    }


}