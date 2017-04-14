
// importa models/user
// import models/user
var User = require('../models/user');



// metodo para pesquisar por id
// method for searching by id
exports.userId = (req, res) => {

    User.findById({_id: req.params.id}, (error, user) => {

        if (error) {

            res.status(400).send(error.message);

        } else {

            res.send(user);
        }

    })
}


// metodo para inserir usuario
// method to insert user
exports.insert = (req, res) => {

    const user = new User(req.body);

    user.save((error, user) => {

        if (error) {

            res.status(412).send(error.message);
            

        } else {

            res.status(201).send(user);
            

        }

    });

}



// metodo para actualizar usuario
// method user update
exports.update = (req, res) => {

    User.findByIdAndUpdate({_id: req.params.id}, req.body, (error, user) => {

        if (error) {

            res.status(412).send(error.message);

        } else {

            res.send(user.id);

        }

    })
}
