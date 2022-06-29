<br/>


<details>
  <summary><strong>🌞‍Habilidades</strong></summary>
  
- Declarar variáveis e funções com tipagens _Typescript_;

- Construir uma _API Node Express_ utilizando o _Typescript_.

</details>


<details>
      <summary><strong>🐝O que foi desenvolvido</strong></summary><br />


**CRUD** (_Create, Read, Update_ e _Delete_) de itens medievais, no formato de uma _API_, utilizando _Typescript_.
</details>



<details>
    <summary><strong>🌱‍Instruções para executar o projeto</strong></summary><br />

1. Clone o repositório

- `git clone https://github.com/rphsantos1995/typescript-mysql-crud.git`.

Entre na pasta do repositório que você acabou de clonar:
  - `cd sd-014-b-project-trybesmith`
2. Instale as dependências 
- `npm install`
3. Inicie o servidor localmente
- `npm start`

</details>


<details>
    <summary><strong>Tabelas</strong></summary><br />

O banco terá três tabelas: pessoas usuárias, produtos e pedidos.

```sql
DROP SCHEMA IF EXISTS Trybesmith;
CREATE SCHEMA Trybesmith;

CREATE TABLE Trybesmith.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  classe TEXT NOT NULL,
  level INTEGER NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Trybesmith.Orders (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES Trybesmith.Users (id)
);

CREATE TABLE Trybesmith.Products (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  amount TEXT NOT NULL,
  orderId INTEGER,
  FOREIGN KEY (orderId) REFERENCES Trybesmith.Orders (id)
);
```

</details>


<details>
    <summary><strong>📜Requisitos do projeto</strong></summary>
        
### 1 - Um endpoint para o cadastro de pessoas usuárias

- O endpoint deve ser acessível através do caminho (`/users`);

- As informações de pessoas usuárias cadastradas devem ser salvas na tabela `Users` do banco de dados;

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no _cadastro_. No seu _payload_ deve estar presente o _id_ e _username_.

- O endpoint deve receber a seguinte estrutura:
```json
{
  "username": "string",
  "classe": "string",
  "level": 1,
  "password": "string"
}
```


### 2 - Um endpoint para o login de pessoas usuárias

- O endpoint deve ser acessível através do caminho (`/login`).

- A rota deve receber os campos `username` e `password`, e esses campos devem ser validados no banco de dados.

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no _login_. No seu _payload_ deve estar presente o _id_ e _username_.

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "username": "string",
    "password": "string"
  }
```

### 3 - Um endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`).

- Um produto só pode ser criado caso a pessoa usuária esteja _logada_ e o _token_ `JWT` validado.

- Os produtos enviados devem ser salvos na tabela `Products` do banco de dados;

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "name": "Espada longa",
    "amount": "30 peças de ouro"
  }
```

### 4 - Um endpoint para a listagem de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- A rota pode ser acessada apenas por pessoas logadas e com token `JWT` válido;


### 5 - Um endpoint para o cadastro de um pedido

- O endpoint deve ser acessível através do caminho (`/orders`).

- Um pedido só pode ser criado caso a pessoa usuária esteja logada e o token `JWT` validado.

- Os pedidos enviados devem ser salvos na tabela `Orders` do banco de dados. A tabela `Products` também deve ser alterada;

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "products": [1, 2]
  }
```

### 6 - Um endpoint para consultar um pedido

- O endpoint deve ser acessível através do caminho (`/orders/:id`);

- O pedido só poderá ser acessado caso uma pessoa usuária esteja logada e o token `JWT` validado;

- É necessário passar o `id` correspondente ao pedido na rota;

### 7 - Um endpoint para listar todos os pedidos

- O endpoint deve ser acessível através do caminho (`/orders`).

- A lista só poderá ser acessada caso a pessoa usuária esteja logada e o token `JWT` validado.

Quando houver mais de um pedido, o resultado retornado para listar pedidos com sucesso deverá ser conforme exibido abaixo, com um _status http_ `200`:
    
      [
        {
          "id": 1,
          "userId": 2,
          "products": [1, 2]
        },
        {
          "id": 2,
          "userId": 2,
          "products": [3, 1, 4]
        }
      ]


</details>
