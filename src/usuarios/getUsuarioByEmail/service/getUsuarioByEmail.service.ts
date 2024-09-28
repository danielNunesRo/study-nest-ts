import { BadRequestException, Injectable } from "@nestjs/common";
import { GetUsuarioByEmailRepository } from "../repositories/getUsuarioByEmail.repository";
import { GetUsuarioByEmailInputDto } from "../dtos/GetUsuarioByEmailInput.dto";
import { GetUsuarioByEmailOutputDto } from "../dtos/GetUsuarioByEmailOutput.dto";

@Injectable()
export class GetUsuarioByEmailService {

    constructor(private readonly repository: GetUsuarioByEmailRepository) {}

    async exec(data: GetUsuarioByEmailInputDto): Promise<GetUsuarioByEmailOutputDto> {
        try {
            const response =  await this.repository.GetUserByEmail(data);

            if(!response) {
                throw new BadRequestException("Não existe usuário com esse email cadastrado!");
            }

            return response;

        } catch (error) {
            console.error("Erro ao buscar usuario")
            throw error;
        }

    }

}