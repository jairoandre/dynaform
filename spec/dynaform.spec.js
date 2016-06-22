// Load jquery for the test
var $ = global.jQuery = require('jquery');

// Load jquery asserts for jasmine
require('jasmine-jquery');

// Load the plugin
require('../src/app/dynaform.js');

describe('Dynaform plugin', function () {

  beforeEach(function () {
    $('<div id="integration_form"></div>').appendTo('body');
  });

  afterEach(function () {
    $('#integration_form').remove();
  });

  var defaultOptions = {
    'fields': {
      'estado': ['PR', 'SC', 'SP', 'RS'],
      'nivel': ['Iniciante', 'Intermediário', 'Avançado', 'Ninja']
    }
  };

  it('should add form to div', function (done) {
    $('#integration_form').dynaform(defaultOptions);
    expect($('form')).toBeInDOM();
    // Check for fields
    expect($('#nome')).toBeInDOM();
    expect($('#email')).toBeInDOM();
    expect($('#estado')).toBeInDOM();
    expect($('#nivel')).toBeInDOM();
    done();
  });

  it('should fire AJAX request to API after button click', function (done) {
    $('#integration_form').dynaform(defaultOptions);
    var spyEvent = spyOnEvent('#button', 'click');
    spyOn($, 'ajax');
    $('#button').click();
    expect('click').toHaveBeenTriggeredOn('#button');
    expect(spyEvent).toHaveBeenTriggered();
    expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('http://localhost:3000/api/user');
    done();
  });
});
