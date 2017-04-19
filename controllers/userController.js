
// importa models/user
// import models/user
var User = require('../models/user');



// metodo proteger rotas com autenticação (token)
// method to protect routes with authentication
exports.authorize = (token, resp) => {

    // .findOne()  ->  metodo mongoDB, procura token na BD
    User.findOne({'token': token}, (error, user) => {

        // em caso de erro
        if (error) {

            // com erro, devolve falso
            resp(false);

        } else if (user) {

            // encontrando usuario, devolve verdadeiro
            resp(true);

        } else {

            // nao encontrado usuario, devolve falso
            resp(false);

        }
        

    });

}



// metodo para listar detalhes user autenticado
// method to list details user authenticated
exports.userData = (token, id, res) => {

    // procura token BD
    User.findOne({'token': token}, (error, user) => {

        // em caso de erro
        if (error) {

            res.send(error.message);

        // caso encontre usuario ...
        } else if (user) {

                // verifica se user.id corresponde ao da url
                if (user.id === id) {

                    // devolve (detalhes) usuario
                    res.send(user);

                } else {

                    // 403 devolve proibido (return forbidden)
                    res.sendStatus(403);

                }


        // no caso nao encontrar usuario
        } else {

            // devolve requisicao invalida (400)
            // return invalid request (400)
            res.sendStatus(400);

        }

    });
    

}



// metodo para pesquisar por id
// method for searching by id
/*
exports.userId = (req, res) => {

    User.findById({_id: req.params.id}, (error, user) => {

        if (error) {

            res.status(400).send(error.message);

        } else {

            res.send(user);
        }

    })
}
*/



// metodo para inserir usuario, encripta senha e cria token
// method to insert user, encrypts password and creates token
exports.insert = (req, res) => {

    // define propriedades obrigatorias
    // define reqired fields/properties
    // O nome é obrigatório | O e-mail é obrigatório | O e-mail inválido
    // A senha é obrigatória
    req.assert('name', 'Name is required').notEmpty();
    req.assert('email', 'Email is required').notEmpty();
    req.assert('email', 'Invalid email').isEmail();
    req.assert('password', 'Password is required').notEmpty();

    // anexa o(s) erro(s) das validacoes em 'error'
    var error = req.validationErrors();
    if (error) {

        // em caso de existir erro, envia status '400'
        // incase of error, sends status '400'
        res.sendStatus(400).send(error.message);

    } else {

            // procura usuario pelo nome
            // search user name
            User.findOne({'email': req.body.email}, (error, user) => {

                if (error) {

                    // devolve 412 - pre-condicao falhou
                    // returm 412 - precondition failed
                    res.sendStatus(412).send(error.message);

                } else if (user) {

                    // um usuario com esse nome já existe
                    res.send('a user with that email already exists');

                } else {

                    // 'user' recebe a instancia User
                    let user = new User();

                    user.name = req.body.name;
                    user.email = req.body.email;

                    // encriptar a senha
                    // encryp password
                    user.password = user.encryptPass(req.body.password);
                    // criar 'token'
                    // created 'token'
                    user.token = user.createToken(req.body.name, req.body.password);
                    
                    user.save((error, user) => {

                        if (error) {

                            // devolve 412 - pre-condicao falhou
                            // returm 412 - precondition failed
                            res.sendStatus(412).send(error.message);
                            
                        } else {

                            // devolve 201 - criado
                            // returm 201 - created
                            //res.sendStatus(201).send(user);
                            res.sendStatus(201);

                        }

                    });


                }

            })


    }


}



// metodo autenticar usuario
// method user authentication
exports.auth = (req, res) => {

    // define propriedades obrigatorias
    // define reqired fields/properties
    // O e-mail é obrigatório | A senha é obrigatória
    req.assert('email', 'Email is required').notEmpty();
    req.assert('password', 'Password is required').notEmpty();

    // anexa o(s) erro(s) das validacoes em 'error'
    var error = req.validationErrors();
    if (error) {

        // em caso de existir erro, envia status '400'
        // incase of error, sends status '400'
        res.sendStatus(400).send(error.message);

    } else {


            // .findOne()  ->  metodo mongoDB; procura user bd pelo nome
            User.findOne({'email': req.body.email}, (error, user) => {

                // em caso de erro
                if (error) {

                    // devolve 412 - pre-condicao falhou
                    // returm 412 - precondition failed
                    //res.sendStatus(412).send(error.message);
                    res.send(error.message);

                // caso encontre usuario ...
                } else if (user) {

                    // confirma se a senha está correcta
                    if (user.validatePass(req.body.password, user.password)) {

                        // devolve token
                        // return token
                        res.send(user.token);

                    } else {

                        // devolve 'senha errada'
                        // return 'wrong password'
                        res.send('wrong password');

                    }

                // caso nao encontre usuario ...
                } else {

                    // 404 - nao encontrado
                    // 404 - not found
                    res.sendStatus(404)
                    // usuario nao existe
                    //res.send('user does not exist');

                }

            })


    }
    
}



// metodo para actualizar usuario
// method user update
exports.update = (token, id, req, res) => {

    // define propriedades obrigatorias
    // define reqired fields/properties
    // O nome é obrigatório | O e-mail é obrigatório | O e-mail inválido
    // A senha é obrigatória
    req.assert('name', 'Name is required').notEmpty();
    req.assert('email', 'Email is required').notEmpty();
    req.assert('email', 'Invalid email').isEmail();
    req.assert('password', 'Password is required').notEmpty();

    // anexa o(s) erro(s) das validacoes em 'error'
    var error = req.validationErrors();

    if (error) {

        // em caso de existir erro, envia status '400'
        // incase of error, sends status '400'
        res.sendStatus(400).send(error.message);

    } else {


            // procura 'token' BD
            User.findOne({'token': token}, (error, user) => {

                // em caso de erro
                if (error) {

                    // devolve descricao erro
                    res.send(error.message);

                // caso encontre usuario ...
                } else if (user) {

                        // verifica se user.id corresponde ao da url
                        if (user._id == id) {

                            // encriptar a senha
                            // encryp password
                            req.body.password = user.encryptPass(req.body.password);

                            // actualiza dados do usuario correspondente - id
                            User.update({_id: id}, req.body, (error, user) => {

                                // em caso de erro
                                if (error) {

                                    // decolve 400 - requisicao invalida
                                    // return 400 - invalid request
                                    res.sendStatus(400).send(error.message);

                                // devolve 'id' usuario actualizado
                                } else {

                                    // 204 - nenhum conteudo (no content)
                                    //res.sendStatus(204).send(id);
                                    //res.send('OK');
                                    res.sendStatus(204);

                                }
                            })


                    } else {

                        // decolve 403 - proibido
                        // return 403 - forbidden
                        res.sendStatus(403);

                    }



                } else {

                    // decolve 400 - requisicao invalida
                    // return 400 - invalid request
                    res.sendStatus(400);

                }

            });
            

    }

}



// metodo para eliminar usuario
// method to delete user
exports.delete = (token, id, res) => {

    // procura 'token' BD
    User.findOne({'token': token}, (error, user) => {

        // em caso de erro
        if (error) {

            // devolve descricao erro
            res.send(error.message);


        } else if (user) {
            
            //console.log(user.id);
            //console.log(id);

                if (user.id === id) {

                    User.remove({_id: id}, (error, user) => {
                    //User.remove((error, user) => {

                        if (error) {

                            // decolve 400 - requisicao invalida
                            // return 400 - invalid request
                            res.sendStatus(400).send(error.message);

                        } else {

                            // 204 - nenhum conteudo (no content)
                            //res.status(204).send(id);
                            //res.send('OK');
                            res.sendStatus(204);

                        }
                    })



            } else {

                // decolve 403 - proibido
                // return 403 - forbidden
                res.sendStatus(403);

            }

        } else {

            // decolve 400 - requisicao invalida
            // return 400 - invalid request
            res.sendStatus(400);

        }

    });


}
