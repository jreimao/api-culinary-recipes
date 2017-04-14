
// importa models/recipe
// import models/recipe
var Recipe = require('../models/recipe');



// metodo para listar todas as receitas - GET
// method to list all recipes - GET
exports.list = (resp) => {

    Recipe.find({}, (error, recipes) => {

        if (error) {

            // mensagem em caso de erro
            // message in case of error
            // 'não foi possivel pesquisar as receitas'
            resp({error: 'it was not possible to search recipes'});

        } else {

            // devolve lista receitas
            // return list recipes
            resp(recipes);

        }

    })

}


// metodo para pesquisa por id - GET
// method for searching by id - GET
exports.listId = (id, callback) => {

    Recipe.findById({_id: id}, (error, recipe) => {


        if (error) {
            
            // mensagem em caso de erro
            // message in case of error
            callback(400);
            // 400 - Requisição inválida

        } else {

            callback(recipe);

        }

    });

}


// metodo para inserir receita
// method to insert recipe
exports.insert = (req, callback) => {

    const recipe = new Recipe(req.body);

    recipe.save((error, recipe) => {

        if (error) {

            // mensagem em caso de erro
            // message in case of error
            // não foi possivel guardar a receita
            callback({error: 'It was not possibel to save the recipe'});

        } else {

            // devolve a receita inserida
            // return of recipe inserted
            callback(recipe);
        
        }

    });


}


// metodo para actualizar
// method to update
exports.update = (id, req, res) => {

    Recipe.findOneAndUpdate({ _id: id}, req.body, (error, resp) => {

        if (error) {

            // 412 - Precondition Failed
            res(412);

        } else {

            res(200);

        }

    });
}


// metodo para eliminar
// method to delete
exports.delete = (id, callback) => {

    // .remove()  ->  metodo do mongoDB
    Recipe.remove({_id: id}, (error, recipe) => {

        if (error) {

            callback(400);

        } else {

            callback(204);
            

        }

    });

}
