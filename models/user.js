
// nome deste ficheiro define o nome da colecão da bd - recipe
// name of this file defines the name of the db collection - recipe

// importar framework mongoose
// import mongoose framework
var mongoose = require('mongoose');

// classe Schema, instruções para criar 'colecção'
// class Schema, instructions to create 'collection'
var Schema = mongoose.Schema;



// modelo 'usuario' para criar 'colecção' - objecto tipo Schema
// template 'user' to create 'collection' - Schema object
var UserSchema = new Schema({

    name:       String,
    email:      String,
    password:   String

});


// exporta module ...; permite ser importado em outros locais
// exportar modulo mongoose.module com os atributos 'recipe' e 'recipeShema'
// export module ...; allowed to be imported in other places
// export modulo mongoose.module with attributes' recipe 'recipe Shema'
module.exports = mongoose.model('User', UserSchema);
