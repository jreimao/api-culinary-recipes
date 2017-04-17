
// importa models/recipe
// import models/recipe
var Recipe = require('../models/recipe');



exports.recipesList = (req, res) => {

    Recipe.find({}, (error, recipes) => {

        if (error) {

            // mensagem em caso de erro
            // message in case of error
            // devolve estado 400 (requisição inválida) e mensagem com o error
            // return state 400 (invalid request) and message with error
            res.status(400).send(error.message);

        } else {

            // devolve lista receitas
            // return list recipes
            res.send(recipes);

        }

    })

}


// metodo para pesquisa por id - GET
// method for searching by id - GET
exports.recipeId = (req, res) => {

    Recipe.findById({_id: req.params.id}, (error, recipe) => {

        if (error) {

            // devolve estado 400 (requisição inválida) e mensagem com o error
            // return state 400 (invalid request) and message with error
            res.status(400).send(error.message);

        } else {

            // devolve a receita
            // return recipe
            res.send(recipe);

        }

    })

}



exports.insert = (req, res) => {

    const recipe = new Recipe(req.body);
    
    recipe.save((error, recipe) => {

        if (error) {

            // devolve estado 412 (pré-condição falhou) e mensagem com o error
            // return state 412 (precondition failed) and message with error
            res.status(412).send(error.message);
            
        } else {

            // devolve a receita inserida
            // return of recipe inserted
            res.send(recipe);

        }
    });
}


// metodo para actualizar
// method to update
exports.update = (req, res) => {

    Recipe.findOneAndUpdate({ _id: req.params.id}, req.body, (error, recipe) => {

        if (error) {

            // devolve estado 412 (pré-condição falhou) e mensagem com o error
            // return state 412 (precondition failed) and message with error
            res.status(412).send(error.message);

        } else {

            // devolve status 200 - OK
            // return status 200 - OK
            res.send(req.body);

        }

    })
}


// metodo para eliminar
// method to delete
exports.delete = (req, res) => {

    var id = req.params.id;

    Recipe.remove((error, recipe) => {

        if (error) {

            //callback({error: 'não foi possivel excluir'});
            //callback(400);
            res.status(400).send(error.message);

        } else {

            // devolve status 204 - OK
            // return status 204 - OK
            //res.status(204);
            res.status(204).send(id);

        }

    });

}
