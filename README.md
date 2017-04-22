
###### [read this page in english](https://github.com/jreimao/api-culinary-recipes/blob/master/README-en.md)


# sobre api-culinary-recipes

  > **api restful** mrc (model-route-controller) foi desenhada para gerir 'receitas de culinária' e os seus utilizadores; nesta primeira versão podemos consumir receitas sem estar autenticado, para as restantes funcionalidades será mesmo necessário fazer o registo

  > entre as funcionalidades podemos criar, visualizar, visualizar por id, editar, eliminar tanto **receitas** como **usuários**


# algumas das 'framesworks' | bibliotecas utilizadas

  | nome   | principais funcionalidades |
  | ------ | ------ |
  | [babel](https://babeljs.io/) babel-cli babel-preset-es2015 |  transforma (transpilador) o código ES6 (ECMScript6) para ES5 (versão que a maioria dos browsers dá suporte hoje) |
  | [bcrypt](https://www.npmjs.com/package/bcrypt) | encripta a senha |
  | [body-parser](https://www.npmjs.com/package/body-parser) | converte os dados da entrada/saída em json |
  | [express](http://expressjs.com/) | organiza o código da api para ser executado em nodejs |
  | [express-validator](https://www.npmjs.com/package/express-validator) | valida a entrada de dados na api - ao inserir ou editar dados |
  | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | implementa o processo de autenticação na api |
  | [mongoose](http://mongoosejs.com/index.html) | fornece um conjunto de recursos para que express possa trabalhar com o mongodb |


# requisitos e instalação

#### requisitos
  - nodeJS v4+
    https://nodejs.org/en/
    
  - mongoDB (com a base de dados **db-culinary-recipes** criada)
    https://www.mongodb.com/
  

#### instalação

  linha de comandos (windows):
  ```sh
  $ git clone https://github.com/jreimao/api-culinary-recipes.git [Enter]
  $ cd api-culinary-recipes [Enter]
  $ npm install [Enter]
  $ node index.js [Enter]
  ```

  browser:
  ( domínio/nome-api/versão-api/recurso-api/ )
  http://localhost:3000/api-culinary-recipes/v1/


# acessos

  | métodos    | endereços | breve descrição |
  | ------     | ------    | ------          |
  | get        | .../api-culinary-recipes/v1/recipe/       | lista receitas |
  | get        | .../api-culinary-recipes/v1/recipe/:id    | receita com id |
  | **post**   | **.../api-culinary-recipes/v1/recipe/**   | **inserir receita** |
  | **put**    | **.../api-culinary-recipes/v1/recipe/**   | **editar receita** |
  | **delete** | **.../api-culinary-recipes/v1/recipe/**   | **eliminar receita** |
  | **get**    | **.../api-culinary-recipes/v1/user/:id**  | **usuário com id** |
  | post       | .../api-culinary-recipes/v1/user/         | inserir usuário |
  | **post**   | **.../api-culinary-recipes/v1/user/auth** | **autenticar usuário** |
  | **put**    | **.../api-culinary-recipes/v1/user/**     | **editar usuário** |
  | **delete** | **.../api-culinary-recipes/v1/user/**     | **eliminar usuário** |

  **a negrito todos os acessos que necessitam de autenticação**


  **exemplos de respostas da api**:

  http://localhost:3000/api-culinary-recipes/v1
    Bem-vindo a API api-culinary-recipes versao 1

  http://localhost:3000/api-culinary-recipes/v1/recipe
    [
        {
            "_id": "58f782f4e5073921d43eb5b5",
            "title": "creme cenoura",
            "subtitle": "cremoso, fresco e saboraso",
            "cost": "",
            "duration": "20",
            "preparation": "",
            "difficulty": "fácil",
            "__v": 0,
            "video": [ "{'name': 'video1.avi'}",
                "{'name': 'video1.mpeg'}",
                ... ],
            "image": [ "{'name': 'cenouras.png'}",
                "{'name': 'pronto-para-saboriar.jpg'}",
                ... ],
            "ingredients": [ "{'name': 'cenoura'}",
                "{'name': 'gengibre'}",
                ... ]
        }
    ]

  http://localhost:3000/api-culinary-recipes/v1/user/:58f780b994c5261624812cf5
    [
        {
            "_id": "58f780b994c5261624812cf5",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW8gcmVpbWFvIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE0OTI2MTUzNTN9.A4xVEVeg3sREWQp4GD4c8Faiw_JO4zx_hSVYYPEYdBY",
            "password": "$2a$09$dslbnOI.CQ0C/JRoAKGN/.sgKrgbUO4lx98cdBbNyKQjFkN7.o78S",
            "email": "joaoreimao@mail.com",
            "name": "joao reimao",
            "__v": 0
        }
    ]



  # licença
  MIT
  **aplicação gratuita**

  

  # autor

  ![foto joão reimão](https://avatars2.githubusercontent.com/u/15116081?v=3&s=75 "joão reimão")
  joão reimão | web and mobile programmer | email: jreimao@yahoo.com
