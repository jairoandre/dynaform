var express = require('express');

function getRouter () {
  var router = express.Router();

  router.route('/user').post(postUser);

  return router;
}

module.exports.getRouter = getRouter;

var array = [];

function postUser (req, res, next) {

  var user = req.body.user;

  if (user) {
    if (user.name) {
      array.push(user);
      res.send(array);  
    } else {
      res.status(500).end('Nome obrigatório');
    }
    
  } else {
    res.status(500).end('Erro');
  }
};
