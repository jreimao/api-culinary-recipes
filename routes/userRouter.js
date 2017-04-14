
// importar express
// import express
var express = require('express');

// anexar metodo Router() 'express' variavel router
// attach Router() method of 'express' to router variable
var router = express.Router();

// importa '../controllers/userController'
// import '../controllers/userController'
var userController = require('../controllers/userController');



// rota pesquisa usuario por id - GET
// route search user by id - GET
router.get('/:id', (req, res) => {

    userController.userId(req, res);
    
})


// rota inserir usuario - POST
// route insert user - POST
router.post('/', (req, res) => {

    userController.insert(req, res);
    
})


// rota actualizar usuario - PUT
// route user update - PUT
router.put('/:id', (req, res) => {

    userController.update(req, res);

})



// exporta module 'router' permite ser importado e utilizado noutros locais
module.exports = router;
