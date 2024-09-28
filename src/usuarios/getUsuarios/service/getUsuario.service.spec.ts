import { Test, TestingModule } from "@nestjs/testing";
import { GetUsuarioRepository } from "../repositories/getUsuario.repository";
import { GetUsuarioService } from "./getUsuario.service";
import { vi } from "vitest";
import { GetUsuarioOutputDto } from "../dto/getUsuarioOutput.dto";


const mockDatasInDatabase = [
  {
    nome: 'Daniel',

    sobrenome: 'Nunes',

    email: 'daniel@gmail.com',

    telefone: '558758959494'

  },

  {
    nome: 'Tulla',

    sobrenome: 'Luana',

    email: 'tulla@gmail.com',

    telefone: '5587512359494'
  }
]


describe('GetUsuarioService', async () => {
  let sut: GetUsuarioService; 
  let getUsuarioRepository: GetUsuarioRepository; 
  let module: TestingModule; 
  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        GetUsuarioService,
        {
          provide: GetUsuarioRepository,
          useValue: {
            getMembros: vi.fn(), 
          },
        },
      ],
    }).compile();


    sut = module.get<GetUsuarioService>(GetUsuarioService);
    getUsuarioRepository = module.get<GetUsuarioRepository>(GetUsuarioRepository);
  });
  
  it('should be defined', () => {
    expect(sut).toBeDefined(); 
    expect(getUsuarioRepository).toBeDefined(); 
  });

  describe('GetMembrosService', async () => {
    it('Testa se volta um array de GetMembros', async  () => {
      //arange
      vi.spyOn(getUsuarioRepository, 'getMembros').mockResolvedValueOnce(mockDatasInDatabase);

      //act
      const result =  await getUsuarioRepository.getMembros();

      //assert
      expect(result).toEqual(mockDatasInDatabase);

    })
  })
});

 
