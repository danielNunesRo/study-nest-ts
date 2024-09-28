import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/shared/database/Database.service";
import { GetUsuarioByEmailOutputDto } from "../dtos/GetUsuarioByEmailOutput.dto";


@Injectable()
export class GetUsuarioByEmailRepository {

    constructor(private readonly db: DatabaseService) {}

    async GetUserByEmail(obj:{email:string}): Promise<GetUsuarioByEmailOutputDto> {

        const sql = `
            SELECT NOME, SOBRENOME, EMAIL, TELEFONE FROM clientes c
            WHERE email = :email
        `

        const binds = {
            email: obj.email
        }

        const response = await this.db.query(sql, binds);

        return response[0];

    }

}