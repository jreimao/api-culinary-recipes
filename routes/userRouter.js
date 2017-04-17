
// importar express
// import express
var express = require('express');

// anexar metodo Router() 'express' variavel router
// attach Router() method of 'express' to router variable
var router = express.Router();

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



router.post('/auth', (req, res) => {

    userController.auth(req, res);

})



// rota pesquisa usuario por id - GET
// route search user by id - GET
router.get('/:id', getToken, (req, res) => {

    userController.userData(req, res);
    
})



// rota inserir usuario - POST
// route insert user - POST
router.post('/', (req, res) => {

    userController.insert(req, res);
    
})



// rota actualizar usuario - PUT
// route user update - PUT
router.put('/:id', getToken, (req, res) => {

    userController.update(req, res);

})



// rota eliminar usuario - DELETE
// route delete user - DELETE
router.delete('/:id', getToken, (req, res) => {

    userController.delete(req, res);

})



module.exports = router;
