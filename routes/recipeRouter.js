
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
router.get('/', (req, res) => {
    
    recipeController.list((resp) => {

        res.json(resp);
        
    })

});


// rota pesquisa receita pr id - GET
// route search recipe by id - GET
router.get('/:id', (req, res) => {

    var id = req.params.id;

    recipeController.listId(id, (resp) => {

        res.json(resp);

    });

})


// rota inserir receita - POST
// route insert recipe - POST
router.post('/', (req, res) => {

    recipeController.insert(req, (resp) => {

        res.json(resp);

    })

})


// rota actualizar receita - PUT
// route update recipe - PUT
router.put('/:id', (req, res) => {

    var id = req.params.id;

    recipeController.update(id, req, (resp) => {

        res.json(resp);
    });

})


// rota eliminar receita - DELETE
// route delete recipe - DELETE
router.delete('/:id', (req, res) => {

    var id = req.params.id;

    recipeController.delete(id, (resp) => {

        res.json(resp);
    })

})



// exporta module 'router' permite ser importado e utilizado noutros locais
module.exports = router;
