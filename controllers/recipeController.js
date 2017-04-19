
// importa models/recipe
// import models/recipe
var Recipe = require('../models/recipe');



// metodo para listar todas as receitas
// method to list all recipes
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



// metodo para pesquisa por id
// method for searching by id
exports.recipeId = (req, res) => {

    // .findById()  ->  metodo do mongoDB
    // _id  ->  propriedade da colecção
    // id  -> id passado pela url
    Recipe.findById({_id: req.params.id}, (error, recipe) => {

        if (error) {

            // devolve estado 400 (requisição inválida) e mensagem com o error
            // return state 400 (invalid request) and message with error
            res.sendStatus(400).send(error.message);

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

    // define propriedades obrigatorias
    // define reqired fields/properties
    // O title é obrigatório | O sub-titulo é obrigatório
    req.assert('title', 'Title is required').notEmpty();
    req.assert('subtitle', 'Subtitle is required').notEmpty();

    var error = req.validationErrors();
    if (error) {

        // em caso de existir erro, envia status '400' - Requisicao invalida
        // incase of error, send status '400' - Invalid request
        res.sendStatus(400).send(error.message);

    } else {


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
                    res.sendStatus(412).send(error.message);
                    
                } else {

                    // devolve a receita inserida
                    // return of recipe inserted
                    res.send(recipe);

                }
            });


    }

}



// metodo para actualizar
// method to update
exports.update = (req, res) => {

    // define propriedades obrigatorias
    // define reqired fields/properties
    // O title é obrigatório | O sub-titulo é obrigatório
    req.assert('title', 'Title is required').notEmpty();
    req.assert('subtitle', 'Subtitle is required').notEmpty();

    var error = req.validationErrors();
    if (error) {

        // em caso de existir erro, envia status '400' - Requisicao invalida
        // incase of error, send status '400' - Invalid request
        res.sendStatus(400).send(error.message);

    } else {


            // Recipe  ->  classe/objecto
            // .findOneAndUpdate()  ->  metodo do mongoDB
            // metodo recebe o id (para identificar a receita), dados da requisição - 
            // req.body e espra uma das duas respostas - erro ou status 200 - OK
            Recipe.findOneAndUpdate({ _id: req.params.id}, req.body, (error, recipe) => {

                if (error) {

                    // devolve estado 412 (pré-condição falhou) e mensagem com o error
                    // return state 412 (precondition failed) and message with error
                    res.sendStatus(412).send(error.message);

                } else {

                    // devolve status 200 - OK
                    // return status 200 - OK
                    res.send(req.body);
                    //res.sendStatus(200).send(recipe.id);

                }

            })


    }
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
            // 400 - Requisicao invalida
            // 400 - Invalid request
            //callback(400);
            res.sendStatus(400).send(error.message);

        } else {

            // devolve status 204 - OK (Nenhum conteudo)
            // return status 204 - OK (No content)
            //res.sendStatus(204);
            res.sendStatus(204);

        }

    });

}
