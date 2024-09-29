import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/shared/database/Database.service";

@Injectable()
export class PostUsuarioRepository {

    constructor(private readonly db: DatabaseService) {}

    async PostUsuario(obj: {nome: string, sobrenome: string, email: string, telefone: string}) {


        const sql = `
        INSERT INTO CLIENTES (NOME, SOBRENOME, EMAIL, TELEFONE)
        VALUES (:nome, :sobrenome, :email, :telefone)
        `

        const binds = {
            nome: obj.nome,
            sobrenome: obj.sobrenome,
            email: obj.email,
            telefone: obj.telefone,
        }

        return await this.db.query(sql, binds);
    }

    async existingUser(email: string) {

        const sql = `
            SELECT NOME, SOBRENOME, EMAIL, TELEFONE FROM clientes c
            WHERE email = :email
        `

        const binds = {
            email: email
        }

        const response = await this.db.query(sql, binds);

        return response[0];

    }

}