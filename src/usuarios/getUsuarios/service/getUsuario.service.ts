import { Injectable } from "@nestjs/common";
import { GetUsuarioRepository } from "../repositories/getUsuario.repository";
import { GetUsuarioOutputDto } from "../dto/getUsuarioOutput.dto";


@Injectable()
export class GetUsuarioService {

    constructor(private readonly repository:GetUsuarioRepository) {}

    async exec(): Promise<GetUsuarioOutputDto[]> {
        try {

            return await this.repository.getMembros();

        } catch(error) {
            console.error("Erro ao buscar usuarios", error)
            throw error;
        }
        
    }

}