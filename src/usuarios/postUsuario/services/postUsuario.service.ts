import { BadRequestException, Injectable } from "@nestjs/common";
import { PostUsuarioInputDto } from "../dtos/postUsuarioInput.dto";
import { PostUsuarioRepository } from "../repositories/postUsuario.repository";

@Injectable()
export class PostUsuarioService {

    constructor(private readonly repository: PostUsuarioRepository) {}


    async exec(data: PostUsuarioInputDto): Promise<{ message: string }> {
        try {

            
            const existingUser = await this.repository.existingUser(data.email);

            if(existingUser) {
                throw new BadRequestException("Email já cadastrado");
            }
            
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(data.nome.length < 3 ) {
                throw new BadRequestException("Precisa ser um nome válido");
            } 

            if (!regexEmail.test(data.email)) {
                throw new BadRequestException("Precisa ser um email válido");
            }



            const result = await this.repository.PostUsuario(data);

            return {message: 'Usuario criado com sucesso.'};

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
              }
            
            console.error("Erro ao salvar cliente", error)
            throw new Error;

            
        }


    }

}