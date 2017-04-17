
// importa models/user
// import models/user
var User = require('../models/user');



// metodo proteger rotas com autenticação (token)
// method to protect routes with authentication
exports.authorize = (token, resp) => {

    User.findOne({'token': token}, (error, user) => {

        if (error) {

            resp(false);

        } else if (user) {

            resp(true);

        } else {

            resp(false);

        }
        

    });

}


// metodo para listar detalhes user autenticado
// 
exports.userData = (token, id, res) => {

    User.findOne({'token': token}, (error, user) => {

        if (error) {

            res.send(error.message);

        } else if (user) {

                if (user.id === id) {

                    res.send(user);

                } else {
                    res.sendStatus(403);
                }


        } else {

            res.sendStatus(400);

        }

    });

}




// metodo para inserir usuario, encripta senha e cria token
// 
exports.insert = (req, res) => {

    User.findOne({'name': req.body.name}, (error, user) => {

        if (error) {

            res.status(412).send(error.message);

        } else if (user) {

            res.send('a user with that name already exists');
        } else {

            let user = new User();

            user.name = req.body.name;
            user.password = user.encryptPass(req.body.password);
            user.token = user.createToken(req.body.name, req.body.password);
            
            user.save((error, user) => {

                if (error) {

                    res.status(412).send(error.message);
                    

                } else {

                    res.status(201).send(user);
                    

                }

            });


        }

    })

}



// metodo autenticar usuario
// method user authentication
exports.auth = (req, res) => {

    User.findOne({'name': req.body.name}, (error, user) => {

        if (error) {

            res.send(error.message);

        } else if (user) {

            if (user.validatePass(req.body.password, user.password)) {

                res.send(user.token);

            } else {

                res.send('wrong password');

            }

        } else {

            res.send('user does not exist');

        }

    })
    
}



// metodo para actualizar usuario
// method user update
exports.update = (token, id, req, res) => {

    User.findOne({'token': token}, (error, user) => {

        if (error) {

            res.send(error.message);

        } else if (user) {

                if (user.id === id) {

                    req.body.password = user.encryptPass(req.body.password);

                    User.update({_id: id}, req.body, (error, user) => {

                        if (error) {

                            res.status(400).send(error.message);

                        } else {

                            res.send(user.id);

                        }
                    })



            } else {
                res.sendStatus(403);
            }



        } else {

            res.sendStatus(400);

        }

    });

}



// metodo para eliminar usuario
// method to delete user
exports.delete = (token, id, res) => {


    User.findOne({'token': token}, (error, user) => {

        if (error) {

            res.send(error.message);

        } else if (user) {

                if (user.id === id) {

                    User.remove({_id: id}, (error, user) => {

                        if (error) {

                            res.status(400).send(error.message);

                        } else {

                            res.sendStatus(204);

                        }
                    })



            } else {
                res.sendStatus(403);
            }



        } else {

            res.sendStatus(400);

        }

    });


}

