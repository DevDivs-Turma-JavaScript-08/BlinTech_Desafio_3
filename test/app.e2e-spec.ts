import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuario e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity{.ts,.js}'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Não Deve Cadastrar um novo Usuário se a senha for menor que 8 caracteres', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastro')
      .send({
        nome: 'Root',
        email: 'root@root.com',
        senha: 'root',
        cpf: '12345678910',
        tipoDeUsuario: 'Segurado',
        foto: '-',
      })
      .expect(400);

    usuarioId = resposta.body.id;
  });

  it('02 - Não Deve Cadastrar um novo Usuário sem um e-mail valido', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastro')
      .send({
        nome: 'Root',
        email: 'root',
        senha: 'rootroot',
        cpf: '12345678910',
        tipoDeUsuario: 'Segurado',
        foto: '-',
      })
      .expect(400);

    usuarioId = resposta.body.id;
  });

  it('03 - Deve Cadastrar um novo Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastro')
      .send({
        nome: 'Root',
        email: 'root@root.com',
        senha: 'rootroot',
        cpf: '12345678910',
        tipoDeUsuario: 'Segurado',
        foto: '-',
      })
      .expect(201);

    console.log('✅ Usuário cadastrado:', resposta.body);
    usuarioId = resposta.body.id;
  });

  it('04 - Não Deve Cadastrar um Usuário Duplicado', async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastro')
      .send({
        nome: 'Root',
        email: 'root@root.com',
        senha: 'rootroot',
        cpf: '12345678910',
        tipoDeUsuario: 'Segurado',
        foto: '-',
      })
      .expect(400);
  });

  it('05 - Não Deve Autenticar o Usuário (Login) Se a Senha Estiver Errada', async () => {
    console.log('🔍 Tentando login com senha incorreta...');
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/login')
      .send({
        email: 'root@root.com',
        senha: 'senhaerrada',
      })
      .expect(401);

    console.log('❌ Falha esperada:', resposta.body);
    token = resposta.body.token;
  });

  it('06 - Deve Autenticar o Usuário (Login)', async () => {
    // Debug extra: ver todos usuários no banco antes do login
    const listaUsuarios = await request(app.getHttpServer()).get('/usuarios');
    console.log(
      '📋 Lista de usuários no banco antes do login:',
      listaUsuarios.body,
    );

    const resposta = await request(app.getHttpServer())
      .post('/usuarios/login')
      .send({
        email: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(200);

    console.log('✅ Login bem-sucedido:', resposta.body);
    token = resposta.body.token;
  });

  it('07 - Não Deve Listar Todos os Usuários Sem Estar Logado', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all')
      .send({})
      .expect(401);
  });

  it('08 - Não Deve Atualizar um Usuário Sem Estar Logado', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizacao')
      .send({
        id: usuarioId,
        nome: 'Root2',
        email: 'root@root.com',
        senha: 'rootroot',
        cpf: '12345678910',
        tipoDeUsuario: 'Segurado',
        foto: '-',
      })
      .expect(401);
  });

  it('09 - Deve Listar Todos os Usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });

  it('10 - Deve Atualizar um Usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizacao')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Root 2',
        email: 'root@root.com',
        senha: 'rootroot',
        cpf: '12345678910',
        tipoDeUsuario: 'Segurado',
        foto: '-',
      })
      .expect(200)
      .then((resposta) => {
        expect(resposta.body.nome).toEqual('Root 2');
      });
  });
});
