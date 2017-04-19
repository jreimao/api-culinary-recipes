
// importar express
// import express
var express = require('express');

// anexar metodo Router() 'express' variavel router
// attach Router() method of 'express' to router variable
var router = express.Router();

// importa|import '../controllers/userController'
var userController = require('../controllers/userController');



// metodo recolhe token requisição (confirmar usuario autenticado)
// method gets token request
function getToken(req, res, next) {

    // passa para variavel header o atributo da requisição com token 
    var header = req.headers['authorization'];

    // no caso 'token' nao defenido na requisicao
    if (typeof header !== 'undefined') {

        // atribui variavel 'res.token' o token existente na 'header' 
        // da requisicao
        res.token = header;
        // executa o proximo código
        next();

    } else {

        // 403 - forbidden (proibido)
        //res.sendStatus(403).send(403);
        res.sendStatus(403);

    }

}



// rota autenticação usuario - POST
// route user authentication - POST
router.post('/auth', (req, res) => {

    userController.auth(req, res);

})



// rota pesquisa usuario por id - GET
// route search user by id - GET
router.get('/:id', getToken, (req, res) => {

    //userController.userData(req, res);

    // res.token  ->  token devolvido getToken
    // req.params.id  ->  id retirado url
    userController.userData(res.token, req.params.id, res);
    
})



// rota inserir usuario - POST
// route insert user - POST
router.post('/', (req, res) => {

    userController.insert(req, res);
    
})



// rota actualizar usuario - PUT
// route user update - PUT
router.put('/:id', getToken, (req, res) => {

    //userController.update(req, res);

    // res.token  ->  token devolvido getToken
    // req.params.id  ->  id retirado url
    userController.update(res.token, req.params.id, req, res);

})



// rota eliminar usuario - DELETE
// route delete user - DELETE
router.delete('/:id', getToken, (req, res) => {

    //var token = res.token;
    //console.log(res.token);
    //var id = req.params.id;
    //console.log(req.params.id);

    // res.token  ->  token devolvido getToken
    // req.params.id  ->  id retirado url
    userController.delete(res.token, req.params.id, res);

})



// exporta module 'router' permite ser importado e utilizado noutros locais
module.exports = router;
