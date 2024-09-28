import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/shared/database/Database.service";
import { GetUsuarioOutputDto } from "../dto/getUsuarioOutput.dto";

@Injectable()
export class GetUsuarioRepository {

    constructor(private readonly db: DatabaseService) {}

    async getMembros():Promise<GetUsuarioOutputDto[]> {

        const sql = `
            SELECT NOME, 
            SOBRENOME, 
            EMAIL, 
            TELEFONE 
            FROM clientes c
        `

       return this.db.query(sql);

    }

}