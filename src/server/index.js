var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');
var app = express();

app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', api.getRouter());

app.listen(3000, function () {
  console.log('Listen on port 3000');
});
