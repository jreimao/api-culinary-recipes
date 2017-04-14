
// import config/app
// importa config/app
var app = require('./config/app');

// importar config/db
// import config/db
const db = require('./config/db');

// importar controllers/recipeController
// import controllers/recipeController
var recipeController = require('./controllers/recipeController');

// importar controllers/userController
// import controllers/userController
var userController = require('./controllers/userController');

// importar routes/recipeRouter
// import routes/recipeRouter
var recipeRouter = require('./routes/recipeRouter');

// importar routes/userRouter
// import routes/userRouter
var userRouter = require('./routes/userRouter');



// direcciona para .../api-culinary-recipes/v1
// redirect to .../api-culinary-recipes/v1
app.get('/', function(req, res) {
    res.redirect('/api-culinary-recipes/v1');
});
app.get('/api-culinary-recipes', function(req, res) {
    res.redirect('/api-culinary-recipes/v1');
});


// defenição rota '/api-culinary-recipes/v1'
// route definition '/api-culinary-recipes/v1'
app.get('/api-culinary-recipes/v1', function(req, res){

    //após aceder a rota devolve uma mensagem com o nome api e versão
    //return message with name api and version
    res.end(`Bem-vindo a API ${app.get('name-api')} versao ${app.get('versao-api')}`);
});


// defenição rota '/api-culinary-recipes/v1/recipe'
// route definition '/api-culinary-recipes/v1/recipe'
app.use('/api-culinary-recipes/v1/recipe', recipeRouter);

// defenição rota 'api-culinary-recipes/v1/user'
// route definition 'api-culinary-recipes/v1/user'
app.use('/api-culinary-recipes/v1/user', userRouter);
