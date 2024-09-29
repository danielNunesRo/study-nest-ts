import { Injectable } from "@nestjs/common";
import { UpdateUsuarioRepository } from "../repositories/updateUsuario.repository";
import { UpdateUsuarioInputDto } from "../dto/updateUsuario.dto";

@Injectable()
export class UpdateUsuarioService {

    constructor(private readonly repository: UpdateUsuarioRepository) {}

    async exec(data: UpdateUsuarioInputDto) {

        return await this.repository.updateUsuario(data);

    }

}