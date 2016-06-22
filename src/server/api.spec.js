var request = require('request');

var apiUrl = 'http://localhost:3000/api/user';

var sampleUser = {user: {nome: 'Teste', email: 'teste@teste.com'}};

describe('Dynaform API Server', function () {
  describe('POST /api/user/', function () {
    it('return status code 200', function (done) {
      request.post({url: apiUrl, form: sampleUser}, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('return status code 500', function(done) {
      request.post({url: apiUrl, form: {}}, function (error, response, body) {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

});