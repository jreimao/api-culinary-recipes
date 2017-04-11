
// import config/app
// importa config/app
var app = require('./config/app');



// direcciona para .../api-culinary-recipes/v1
// redirect to .../api-culinary-recipes/v1
app.get('/', function(req, res) {
   res.redirect('/api-culinary-recipes/v1');
});
app.get('/api-culinary-recipes', function(req, res) {
   res.redirect('/api-culinary-recipes/v1');
});


// defenição rota
// route definition
app.get('/api-culinary-recipes/v1', function(req, res){

    console.log(`http://localhost:${app.get('port')}/api-culinary-recipes/v1`);

    //após aceder a rota devolve uma mensagem com o nome api e versão
    //return message with name api and version
    res.end(`Bem-vindo a API ${app.get('name-api')} versao ${app.get('versao-api')}`);
});

