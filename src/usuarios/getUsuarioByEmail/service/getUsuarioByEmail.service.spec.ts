import { Test, TestingModule } from "@nestjs/testing"
import { GetUsuarioByEmailRepository } from "../repositories/getUsuarioByEmail.repository"
import { GetUsuarioByEmailService } from "./getUsuarioByEmail.service"
import { vi } from "vitest"
import { response } from "express"
import { GetUsuarioByEmailInputDto } from "../dtos/GetUsuarioByEmailInput.dto"
import { GetUsuarioByEmailOutputDto } from "../dtos/GetUsuarioByEmailOutput.dto"
import { BadRequestException } from "@nestjs/common"

const mockGetUserByEmailOutputDto: GetUsuarioByEmailOutputDto = {
    nome: 'Daniel',
    sobrenome: 'Eu',
    email: 'danteste@gmail.com',
    telefone: '855585454845568',
}


describe('GetUsuarioByEmailService', async () => {
    let sut: GetUsuarioByEmailService
    let getUsuarioByEmailRepository: GetUsuarioByEmailRepository
    let module: TestingModule

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                GetUsuarioByEmailService,
                {
                    provide: GetUsuarioByEmailRepository,
                    useValue: {
                        GetUserByEmail: vi.fn()
                    },
                },
            ],
        }).compile();

        sut = module.get<GetUsuarioByEmailService>(GetUsuarioByEmailService);
        getUsuarioByEmailRepository = module.get<GetUsuarioByEmailRepository>(GetUsuarioByEmailRepository)
    }); 
    
    it('Should be defined', () => {
        expect(sut).toBeDefined(); 
        expect(getUsuarioByEmailRepository).toBeDefined();
    })

    it('Should return UsuarioOutputDto by email', async () => {
        //arange
        const mockGetUserByEmailDtoInput: GetUsuarioByEmailInputDto = {
            email: 'danteste@gmail.com'
        }
        
        const mockValueInDatabase = {
            nome: 'Daniel',
            sobrenome: 'Eu',
            email: 'danteste@gmail.com',
            telefone: '855585454845568',
        }

        

        vi.spyOn(getUsuarioByEmailRepository, 'GetUserByEmail').mockResolvedValueOnce(mockValueInDatabase);
        
        //act

        const result = await getUsuarioByEmailRepository.GetUserByEmail(mockGetUserByEmailDtoInput)

        //asserts

        expect(result).toEqual(mockGetUserByEmailOutputDto)
        
    })

    it('Should throw exception Bad Request when email invalid', async () => {
        vi.spyOn(getUsuarioByEmailRepository, 'GetUserByEmail').mockResolvedValueOnce(mockGetUserByEmailOutputDto);

        vi.spyOn(getUsuarioByEmailRepository, 'GetUserByEmail').mockImplementationOnce(async () => {
            throw new BadRequestException('Não existe usuário com esse email cadastrado!');
        });

        await expect(getUsuarioByEmailRepository.GetUserByEmail({email: 'daniel@gmail.com'})).rejects.toThrow(BadRequestException);

      

    })
})