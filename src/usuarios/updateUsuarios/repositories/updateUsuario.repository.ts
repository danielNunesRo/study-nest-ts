import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/shared/database/Database.service";
import { UpdateUsuarioInputDto } from "../dto/updateUsuario.dto";

@Injectable()
export class UpdateUsuarioRepository {

    constructor(private readonly db: DatabaseService) {}

    async updateUsuario(dto: UpdateUsuarioInputDto) {

        const sql = `
        UPDATE clientes
        SET nome = :NOME, sobrenome = :SOBRENOME, email = :EMAIL, telefone = :TELEFONE
        WHERE email = :emailAtual
        `

        const binds = {
            nome: dto.nome,
            sobrenome: dto.sobrenome,
            email: dto.email,
            telefone: dto.telefone,
            emailAtual: dto.emailAtual
        }

        const response = await this.db.query(sql, binds);

        return `O usuario foi atualizado com sucesso.`

    }

}