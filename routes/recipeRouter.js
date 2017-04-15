// importa express
// import express
var express = require('express');

// anexa metodo Router() do express a variavel router
// attach Router () method of express to router variable
var router = express.Router();

// importa '../controllers/recipeController'
// import '../controllers/recipeController'
var recipeController = require('../controllers/recipeController');



// rota pesquisa receitas - GET
// route search recipes - GET
// .get()  ->  metodo framework express
router.get('/', (req, res) => {
    
    // chama metodo recipeList do recipeController
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
router.post('/', (req, res) => {

    // chama metodo insert do recipeController
    recipeController.insert(req, res);

})


// rota actualizar receita - PUT
// route update recipe - PUT
router.put('/:id', (req, res) => {

    // chama metodo update do recipeController
    recipeController.update(req, res);

})


// rota eliminar receita - DELETE
// route delete recipe - DELETE
router.delete('/:id', (req, res) => {

    // chama metodo delete do recipeController
    recipeController.delete(req, res);

})



// exporta module 'router' permite ser importado e utilizado noutros locais
module.exports = router;
