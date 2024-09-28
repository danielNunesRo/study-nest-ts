import { Module } from '@nestjs/common';
import { DatabaseService } from './shared/database/Database.service';
import { UsuarioModule } from './usuarios/usuario.module';
import { UsuarioController } from './usuarios/controller/usuario.controller';


@Module({
  imports: [UsuarioModule],
  controllers: [UsuarioController],
  providers: [DatabaseService],
})
export class AppModule {};
