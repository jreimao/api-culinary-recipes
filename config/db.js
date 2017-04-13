
// importar framework mongoose
// import mongoose framework
const mongoose = require('mongoose');

// utilizar biblioteca 'Promise' do nodeJs (v6) e não a do mongoose
mongoose.Promise = Promise;

// endereço e nome bd (base de dados)
// url and name db
// no caso de nao existir variavel ambiente (padrao), utiliza localhost/...
const urlNameBD = process.env.MONGODB_URL || 'mongodb://localhost/db-culinary-recipes';


// ligação a bd e erros
// link to db and bugs
let connect = mongoose.connect(urlNameBD, (err, res) => {

    if (err) {
        
        console.log(err);
        console.log('it is not possible to connect to ' + urlNameBD);

    } else {

        console.log('connected to ' + urlNameBD);

    }

});


// exportar modulo configuração bd
module.exports = connect;
