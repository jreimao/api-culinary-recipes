
###### [leia esta página em português](https://github.com/jreimao/api-culinary-recipes/readme.md)


# about api-culinary-recipes

  > **api restful** mrc (model-router-controller) was designed to manage 'culinary recipes' and its users; this first version we can to view recipes without being authenticated, the other features it will be necessary to register

  > between features we can create, view, view by id, edit, delete **recipes** and **users**



# aome of the frameworks | libraries used

  | name   | main features |
  | ------ | ------ |
  | [babel](https://babeljs.io/) babel-cli babel-preset-es2015 |  transforma (transpilador) o código ES6 (ECMScript6) para ES5 (versão que a maioria dos browsers dá suporte hoje) |
  | [bcrypt](https://www.npmjs.com/package/bcrypt) | encrypts the password |
  | [body-parser](https://www.npmjs.com/package/body-parser) | converts input/output data to json |
  | [express](http://expressjs.com/) | organizes the api code to run on nodejs |
  | [express-validator](https://www.npmjs.com/package/express-validator) | valid data entry in the api - when inserting or editing data |
  | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | implement the authentication process in the api |
  | [mongoose](http://mongoosejs.com/index.html) | allow express to work with mongodb |



# requirements e installation

#### requisites
  - nodeJS v4+
    https://nodejs.org/en/
    
  - mongoDB (with database **db-culinary-recipes**)
    https://www.mongodb.com/
  

#### installation

  command line (windows):
  ```sh
  $ git clone https://github.com/jreimao/api-culinary-recipes.git [Enter]
  $ cd api-culinary-recipes [Enter]
  $ npm install [Enter]
  $ node index.js [Enter]
  ```

  browser:
  ( domain/name-api/version-api/resource/ )
  http://localhost:3000/api-culinary-recipes/v1/



# http verbs

  | methods    | url s | short description |
  | ------     | ----  | ------            |
  | get        | .../api-culinary-recipes/v1/recipe/       | list recipes |
  | get        | .../api-culinary-recipes/v1/recipe/:id    | receita by id |
  | **post**   | **.../api-culinary-recipes/v1/recipe/**   | **insert recipe** |
  | **put**    | **.../api-culinary-recipes/v1/recipe/**   | **edit recipe** |
  | **delete** | **.../api-culinary-recipes/v1/recipe/**   | **delete recipe** |
  | **get**    | **.../api-culinary-recipes/v1/user/:id**  | **user by id** |
  | post       | .../api-culinary-recipes/v1/user/         | insert user |
  | **post**   | **.../api-culinary-recipes/v1/user/auth** | **autthenticate user** |
  | **put**    | **.../api-culinary-recipes/v1/user/**     | **edit user** |
  | **delete** | **.../api-culinary-recipes/v1/user/**     | **delete user** |

  **in bold all accesses that require authentication**


  **examples of api responses**:

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



  # license

  MIT

  **free application**



  # author

  ![photo joão reimão](https://avatars2.githubusercontent.com/u/15116081?v=3&s=75 "joão reimão")
  joão reimão
  web and mobile programmer
  email: jreimao@yahoo.com
