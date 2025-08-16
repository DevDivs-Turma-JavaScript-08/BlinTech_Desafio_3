# <img src="https://i.imgur.com/zIJTbdo.png" width="30px"> BlinTech: Seguros de Eletrônicos

Uma plataforma digital para contratação e gestão de seguros de eletrônicos, como celulares, notebooks, tablets e smartwatches. Este projeto foi o trabalho final do Bloco 2 do bootcamp de Programador Fullstack da Generation Brasil, focado em **Backend**.

> **Grupo:** DevDivs
>
> **Membros:** 
>- [Ágata Andrade](https://github.com/Agataandrade) - PO
>- [Alex Siqueira](https://github.com/alex-sqls) - Dev
>- [Grazielle Gualter](https://github.com/grazielle30) - Tester
>- [Leticia Oliveira](https://github.com/Santos-Leticia) - Dev
>- [Lucas Alves](https://github.com/RaideriSpace) - Dev
>- [Pedro Barbosa](https://github.com/KarpaTech) - Dev 

#### 🔗 Link da documentação em produção - https://blintech.onrender.com/swagger#/

-----

## 📝 Tabela de Conteúdos

  - [Visão Geral](#-visão-geral)
  - [Funcionalidades Principais](#-funcionalidades-principais)
  - [Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [Entidades do Projeto](#-entidades-do-projeto)
  - [Instalação e Uso](#-instalação-e-uso)
  - [Rotas da API](#-rotas-da-api)
  - [Swagger API Documentation](#-swagger-api-documentation)
  - [Contribuição](#-contribuição)
  - [Licença](#-licença)

-----

## 🎯 Visão Geral

O **BlinTech** é uma solução digital criada para simplificar a contratação e o gerenciamento de seguros de eletrônicos. Nosso objetivo é oferecer rapidez, transparência e praticidade para consumidores e seguradoras, simplificando a proteção contra roubo, furto e danos acidentais.

A plataforma automatiza o cálculo do prêmio do seguro, define carências por tipo de cobertura e permite o gerenciamento online das apólices.

-----

## ✨ Funcionalidades Principais

O sistema **BlinTech** é construído com três principais **CRUDs** (Create, Read, Update, Delete):

  - **Usuário**:
      - Cadastro de clientes e administradores com dados como nome, e-mail, senha, CPF e tipo de usuário.
      - Permite criar, listar, buscar por ID ou e-mail, e atualizar usuários.
  - **Categoria**:
      - Gerenciamento de tipos de produtos seguráveis (ex: Celular, Notebook).
      - Permite criar, listar, buscar por ID ou nome, e atualizar categorias.
  - **Produto**:
      - Cadastro de itens segurados vinculados a um usuário e uma categoria.
      - O valor do seguro é calculado automaticamente com base no valor do aparelho, no nível da cobertura (`Básico` - 15%, `Intermediário` - 20%, `Premium` - 30%) e no tempo de uso (com um desconto de 30% se tiver mais de 3 anos).
      - Permite criar, listar, buscar por ID ou nome, atualizar e excluir produtos.

-----

## 🛠️ Tecnologias Utilizadas

  - **Backend**: Node.js, NestJS (TypeScript)
  - **ORM**: TypeORM
  - **Banco de Dados**: MySQL (Desenvolvimento), PostgreSQL (Produção - Render)
  - **Autenticação**: JWT (JSON Web Tokens), Passport.js, bcrypt (criptografia de senhas)
  - **Validação**: `class-validator` e `class-transformer`
  - **Documentação da API**: Swagger (OpenAPI)
  - **Testes de API**: Insomnia

-----

## 📂 Entidades do Projeto

### Diagrama de Entidade Relacional

<div align="center">
  <img src="https://i.imgur.com/zCXQKW6.png">
</div>

### **`Usuario`**

  - `id`: `number` (chave primária)
  - `nome`: `string`
  - `email`: `string`
  - `senha`: `string` (criptografada)
  - `cpf`: `string`
  - `foto`: `string`
  - `tipoDeUsuario`: `string` (ex: "Segurado" ou "Admin")

### **`Categoria`**

  - `id`: `number` (chave primária)
  - `nome`: `string`
  - `descricao`: `string`
  - `carencia`: `number` (em dias)

### **`Produto`**

  - `id`: `number` (chave primária)
  - `nomeProduto`: `string`
  - `descricao`: `string`
  - `cobertura`: `string` (ex: "Básico", "Intermediário", "Premium")
  - `imei`: `string`
  - `valorProduto`: `number`
  - `valorSeguro`: `number` (calculado automaticamente)
  - `premioMensal`: `number` (calculado automaticamente)
  - `tempoUso`: `number` (em anos)
  - `dataDeCadastro`: `Date`
  - `categoria`: `Categoria` (relacionamento Many-to-One)
  - `usuario`: `Usuario` (relacionamento Many-to-One)

-----

## 🚀 Instalação e Uso

Para rodar o projeto localmente, siga os passos abaixo:

### **Pré-requisitos**

  - Node.js (versão 18+)
  - Gerenciador de pacotes npm ou yarn
  - Um banco de dados MySQL ou PostgreSQL instalado e rodando.

### **Passo a Passo**

1.  **Clone o repositório:**

    ```bash
    git clone https://docs.github.com/articles/referencing-and-citing-content
    cd blintech
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configuração do Banco de Dados:**

      - Crie um arquivo `.env` na raiz do projeto, usando o `.env_sample` como base.
      - Preencha as variáveis de ambiente com as credenciais do seu banco de dados MySQL.

    <!-- end list -->

    ```bash
    # .env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=root
    DB_NAME=db_blintech
    ```

4.  **Troque o Serviço de Conexão (apenas para ambiente local):**

      - Abra o arquivo `src/app.module.ts`.
      - Comente a linha `useClass: ProdService,` e descomente a linha `useClass: DevService,` para usar a configuração do banco de dados local.

    <!-- end list -->

    ```typescript
    // src/app.module.ts
    // ...
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useClass: ProdService,
      useClass: DevService,
    }),
    // ...
    ```

5.  **Inicie o servidor:**

    ```bash
    npm run start:dev
    ```

O projeto estará rodando em `http://localhost:4000`.

-----

## 🗺️ Rotas da API

Todas as rotas, exceto a de cadastro de usuário e login, exigem autenticação JWT com um **Bearer Token**.

### **Autenticação e Usuário**

  - `POST /usuarios/login` - Faz o login do usuário e retorna um token de autenticação.
  - `POST /usuarios/cadastro` - Cadastra um novo usuário no sistema.
  - `GET /usuarios/all` - Lista todos os usuários.
  - `GET /usuarios/:id` - Busca um usuário por ID.
  - `PUT /usuarios/atualizacao` - Atualiza os dados de um usuário.

### **Categoria**

  - `GET /categorias` - Lista todas as categorias.
  - `GET /categorias/:id` - Busca uma categoria por ID.
  - `GET /categorias/categoria/:nome` - Busca categorias por nome.
  - `POST /categorias` - Cria uma nova categoria.
  - `PUT /categorias` - Atualiza uma categoria existente.
  - `DELETE /categorias/:id` - Deleta uma categoria.

### **Produto**

  - `GET /produto` - Lista todos os produtos.
  - `GET /produto/:id` - Busca um produto por ID.
  - `GET /produto/produto/:nome` - Busca produtos por nome.
  - `POST /produto` - Cria um novo produto.
  - `PUT /produto` - Atualiza um produto existente.
  - `DELETE /produto/:id` - Deleta um produto.

-----

## 📚 Swagger API Documentation

A documentação completa da API está disponível no endpoint `/swagger`. Após iniciar o projeto, acesse `http://localhost:4000/swagger` para interagir com as rotas de forma visual.

A documentação inclui todos os endpoints e modelos de dados para facilitar o consumo da API.

-----

## 🤝 Contribuição

Contribuições, sugestões e relatórios de bugs são muito bem-vindos\! Se quiser contribuir para o projeto, siga o fluxo de trabalho padrão do GitHub:

1.  Faça um `fork` do projeto.
2.  Crie uma `branch` para sua nova feature ou correção de bug.
3.  Faça suas alterações e `commit`.
4.  Envie um `pull request`.

-----

## ⚖️ Licença

Este projeto é de código aberto e está sob a licença **UNLICENSED**.

