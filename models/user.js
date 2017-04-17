
// nome deste ficheiro define o nome da colecão da bd - recipe
// name of this file defines the name of the db collection - recipe

// importar framework mongoose
// import mongoose framework
var mongoose = require('mongoose');


// classe Schema, instruções para criar 'colecção'
// class Schema, instructions to create 'collection'
var Schema = mongoose.Schema;

// framework 'bcrypt'
// encriptar senha
var bcrypt = require('bcrypt');

// framework 'jsonwebtoken'
// criar token
var jwt = require('jsonwebtoken');


// modelo 'usuario' para criar 'colecção' - objecto tipo Schema
// template 'user' to create 'collection' - Schema object
var UserSchema = new Schema({

    name:       String,
    email:      String,
    password:   String,
    token:      String

});



// metodo encriptar senha
// nethod to encrypt password
UserSchema.methods.encryptPass = (password) => {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));

}


// metodo validar senha
// method validate password
UserSchema.methods.validatePass = (young, old) => {

    // devolve 'verdaeiro' ou 'falso'
    // return 'true/false'
    return bcrypt.compareSync(young, old);

}


// metodo gerar token
// method to create token
UserSchema.methods.createToken = (name, password) => {

    // devolve token
    // return token
    // 'secret'  ->  string - token
    return jwt.sign({'name': name, 'password': password}, 'secret');

}



// exporta module ...; permite ser importado em outros locais
// exportar modulo mongoose.module com os atributos 'recipe' e 'recipeShema'
// export module ...; allowed to be imported in other places
// export modulo mongoose.module with attributes' recipe 'recipe Shema'
module.exports = mongoose.model('User', UserSchema);
