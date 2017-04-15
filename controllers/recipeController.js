// importa models/recipe
// import models/recipe
var Recipe = require('../models/recipe');



// metodo para listar todas as receitas - GET
// method to list all recipes - GET
// exports.list  ->  permite utilizar esta função fora deste ficheiro
// como p. ex. recipeRouter - ... recipeController.list ...
exports.recipesList = (req, res) => {

    // .find()  ->  metodo do mongoDB
    // , recipes){ : recipes  ->  array|vector de objectos
    // arrow function:  () => { }
    // pesquisa especifica - duração: 15 minutos ou ...
    // specific search - duration: 15 minutes
    // recipe.find({duration: '15'}, function(error, recipes){ ...
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

    // .findById()  ->  metodo do mongoDB
    // _id  ->  propriedade da colecção
    // id  -> id passado pela url
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


// metodo para inserir receita
// method to insert recipe
// aguarda a resposta ... callback
exports.insert = (req, res) => {

    // variavel que guarda uma nova instancia (Recipe) onde
    // foi adicionada as propriedades da requisição 'body' - 
    // { title: '...', subtitle: '...', ..., ingredients: [] }
    const recipe = new Recipe(req.body);
    
    // liga os dados ao metodo 'save' - do mongoDB' e respera por
    // uma das duas respostas possiveis - erro ou receita inserida
    // .save()  ->  metodo do mongoDB
    recipe.save((error, recipe) => {
    
        // retorno: erro ou resposta (devolve os dados receita inserida)
        // não foi possivel guardar a receita
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

    // Recipe  ->  classe/objecto
    // .findOneAndUpdate()  ->  metodo do mongoDB
    // metodo recebe o id (para identificar a receita), dados da requisição - 
    // req.body e espra uma das duas respostas - erro ou status 200 - OK
    Recipe.findOneAndUpdate({ _id: req.params.id}, req.body, (error, recipe) => {

        if (error) {

            // devolve estado 412 (pré-condição falhou) e mensagem com o error
            // return state 412 (precondition failed) and message with error
            res.status(412).send(error.message);

        } else {

            // devolve status 200 - OK
            // return status 200 - OK
            res.send(req.body);
            //res.status(200).send(recipe.id);

        }

    })
}


// metodo para eliminar
// method to delete
exports.delete = (req, res) => {

    var id = req.params.id;

    // .remove()  ->  metodo do mongoDB
    Recipe.remove({_id: req.params.id}, (error, recipe) => {
    // metodo elimina todas receitas pq nao tem id
    //Recipe.remove((error, recipe) => {

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
