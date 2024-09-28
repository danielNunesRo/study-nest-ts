import { BadRequestException, Injectable } from "@nestjs/common";
import { PostUsuarioInputDto } from "../dtos/postUsuarioInput.dto";
import { PostUsuarioRepository } from "../repositories/postUsuario.repository";

@Injectable()
export class PostUsuarioService {

    constructor(private readonly repository: PostUsuarioRepository) {}


    async exec(data: PostUsuarioInputDto): Promise<{ message: string }> {
        try {

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(data.nome.length < 3 ) {
                console.error("Precisa ser um nome válido");
                throw new BadRequestException("Precisa ser um nome válido");
            } 

            if (!regexEmail.test(data.email)) {
                console.error("Precisa ser um email válido");
                throw new BadRequestException("Precisa ser um email válido");
            }

            const result = await this.repository.PostUsuario(data);

            return {message: 'Usuario criado com sucesso.'};

        } catch (error) {
            console.error("Erro ao salvar cliente", error)
            throw new Error;
        }


    }

}