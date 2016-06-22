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

  array.push(user);

  if (user) {
    res.send(array);  
  } else {
    res.status(500).end('Erro');
  }
};
