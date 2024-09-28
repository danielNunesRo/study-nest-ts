import { Test, TestingModule } from "@nestjs/testing";
import { PostUsuarioRepository } from "../repositories/postUsuario.repository";
import { PostUsuarioService } from "./postUsuario.service"
import { GetUsuarioRepository } from "src/usuarios/getUsuarios/repositories/getUsuario.repository";
import { vi } from "vitest";
import { BadRequestException } from "@nestjs/common";

describe('PostUsuarioService', async () => {
    let sut: PostUsuarioService; 
    let postUsuarioRepository: PostUsuarioRepository; 
    let module: TestingModule; 
    beforeEach(async () => {
      module = await Test.createTestingModule({
        providers: [
          PostUsuarioService,
          {
            provide: PostUsuarioRepository,
            useValue: {
              PostUsuario: vi.fn(), 
            },
          },
        ],
      }).compile();
  
  
      sut = module.get<PostUsuarioService>(PostUsuarioService);
      postUsuarioRepository = module.get<PostUsuarioRepository>(PostUsuarioRepository);
    });
    
    it('should be defined', () => {
      expect(sut).toBeDefined(); 
      expect(postUsuarioRepository).toBeDefined(); 
    });
  
    describe('PostMembrosService', async () => {
      it('Testa se volta um array de GetMembros', async  () => {
        //arange
        
        const mockData = {
            nome: 'Daniel',
            sobrenome: 'Nunes',
            email: 'daniel@gmail.com',
            telefone: '585558454',
        }
        
        vi.spyOn(postUsuarioRepository, 'PostUsuario').mockResolvedValueOnce(mockData);
  
        //act
        const result =  await postUsuarioRepository.PostUsuario(mockData);
  
        //assert
        expect(result).toEqual(mockData);
  
      })

      it('Testa se dá erro ao instanciar um nome com menos de 3 caracteres', async () => {
        const mockData = {
            nome: 'Da',
            sobrenome: 'Nunes',
            email: 'daniel@gmail.com',
            telefone: '585558454',
        }

        vi.spyOn(postUsuarioRepository, 'PostUsuario').mockImplementationOnce(async () => {
            throw new BadRequestException('Precisa ser um nome válido');
        });
        
        await expect(postUsuarioRepository.PostUsuario(mockData)).rejects.toThrow(BadRequestException);

      });

      it('Testa se dá erro ao instanciar um email sem a formatação', async () => {

        const mockData = {
            nome: 'Daniel',
            sobrenome: 'Nunes',
            email: 'daniel',
            telefone: '585558454',
        }

        vi.spyOn(postUsuarioRepository, 'PostUsuario').mockImplementationOnce(async () => {
            throw new BadRequestException('Precisa ser um email válido');
        });

        await expect(postUsuarioRepository.PostUsuario(mockData)).rejects.toThrow(BadRequestException);


      });

    })
  });

