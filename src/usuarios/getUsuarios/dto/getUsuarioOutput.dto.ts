import { ApiProperty } from "@nestjs/swagger";


export class GetUsuarioOutputDto {
    
    @ApiProperty({description: 'nome do usuario', example: 'Daniel'})
    nome: string;

    @ApiProperty({description: 'sobrenome do usuario', example: 'Alves'})
    sobrenome:string;
    
    @ApiProperty({description: 'email do usuario', example: 'danielalves@gmail.com'})
    email: string
   
    @ApiProperty({description: 'telefone do usuario', example: '8598458544'})
    telefone: string

}