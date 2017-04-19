
// importa express
// import express
var express = require('express');

// anexa metodo Router() do express a variavel router
// attach Router () method of express to router variable
var router = express.Router();

// importa '../controllers/recipeController'
// import '../controllers/recipeController'
var recipeController = require('../controllers/recipeController');

// importa '../controllers/userController'
// import '../controllers/userController'
var userController = require('../controllers/userController');



// metodo recolhe token requisição (confirmar usuario autenticado)
// method gets token request
function getToken(req, res, next) {

    // passa para variavel header o atributo da requisição com token 
    var header = req.headers['authorization'];

    //
    if (typeof header !== 'undefined') {

        // atribui variavel 'res.token' o token existente na 'header' 
        // da requisicao
        res.token = header;
        // executa o proximo código
        next();

    } else {

        // 403 - forbidden
        //res.sendStatus(403).send(403);
        res.sendStatus(403);

    }

}



// rota pesquisa receitas - GET
// route search recipes - GET
// .get()  ->  metodo framework express
router.get('/', (req, res) => {
    
    // pesquisa e devolve receita(s)
    recipeController.recipesList(req, res);

});



// rota pesquisa receita pr id - GET
// route search recipe by id - GET
router.get('/:id', (req, res) => {

    // chama metodo recipeId do recipeController
    recipeController.recipeId(req, res);

})



// rota inserir receita - POST
// route insert recipe - POST
router.post('/', getToken, (req, res) => {

    // recebe o token lido 'header' requisição
    var token = res.token;
    
    //console.log(req);
    //object
    //console.log(res);
    //object

    // confirma se token pertence a algum usuario
    // confirm if token belongs to any user
    userController.authorize(token, (resp) => {

        // confirmado usuario com este token
        // espera - true | false
        if (resp === true) {

            // pesquisa e devolve receita(s)
            recipeController.insert(req, res);

        } else {

            // nao existe usuario com este token
            // devolve 403 - proibido
            res.sendStatus(403);

        }

    });

})



// rota actualizar receita - PUT
// route update recipe - PUT
router.put('/:id', getToken, (req, res) => {

    // recebe o token lido 'header' requisição
    var token = res.token;

    // confirma se token pertence a algum usuario
    // confirm if token belongs to any user
    userController.authorize(token, (resp) => {

        if (resp === true) {

            // confirmado usuario com este token
            // chama metodo update do recipeController
            recipeController.update(req, res);

        } else {

            // nao existe usuario com este token
            // devolve 403 - proibido
            res.sendStatus(403);

        }

    });

})



// rota eliminar receita - DELETE
// route delete recipe - DELETE
router.delete('/:id', getToken, (req, res) => {

    // recebe o token lido 'header' requisição
    var token = res.token;

    // confirma se token pertence a algum usuario
    // confirm if token belongs to any user
    userController.authorize(token, (resp) => {

        if (resp === true) {

            // confirmado usuario com este token
            // chama metodo delete do recipeController
            recipeController.delete(req, res);

        } else {

            // nao existe usuario com este token
            // devolve 403 - proibido
            res.sendStatus(403);

        }

    });

})



// exporta module 'router' permite ser importado e utilizado noutros locais
module.exports = router;
