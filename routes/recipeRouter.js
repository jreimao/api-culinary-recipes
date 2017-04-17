
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

    var header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
 
        res.token = header;
        next();

    } else {

        // 403 - forbidden
        //res.sendStatus(403).send(403);
        res.sendStatus(403);

    }

}


// rota pesquisa receitas - GET
// route search recipes - GET
router.get('/', (req, res) => {

    recipeController.recipesList(req, res);

});


// rota pesquisa receita pr id - GET
// route search recipe by id - GET
router.get('/:id', (req, res) => {

    recipeController.recipeId(req, res);

})



// rota inserir receita - POST
// route insert recipe - POST
router.post('/', getToken, (req, res) => {

    var token = res.token;

    // confirma se token pertence a algum usuario
    // confirm if token belongs to any user
    userController.authorize(token, (resp) => {

        if (resp === true) {

            recipeController.insert(req, res);

        } else {

            res.sendStatus(403);

        }

    });

})



// rota actualizar receita - PUT
// route update recipe - PUT
router.put('/:id', getToken, (req, res) => {

    var token = res.token;

    // confirma se token pertence a algum usuario
    // confirm if token belongs to any user
    userController.authorize(token, (resp) => {

        if (resp === true) {

            recipeController.update(req, res);

        } else {

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

            recipeController.delete(req, res);

        } else {

            res.sendStatus(403);

        }

    });

})



module.exports = router;
