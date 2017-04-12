
// importar framework mongoose
// import mongoose framework
var mongoose = require('mongoose');

// endereço e nome bd (base de dados)
// url and name db
var urlNameBD = 'mongodb://localhost/db-culinary-recipes';

// ligação a bd e erros
// link to db and bugs
mongoose.connect(urlNameBD, function(err, res) {

    if (err) {
        
        //console.log(err);
        console.log('it is not possible to connect to ' + urlNameBD);

    } else {

        console.log('connected to ' + urlNameBD);

    }

});
