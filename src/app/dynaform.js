var jQuery = require('jquery');

function appendInput (elem, id, labelText) {
  var wrapper = document.createElement('div');
  var input = document.createElement('input');
  var label = document.createElement('label');

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  wrapper.className = 'form-group';

  label.className = 'control-label';
  label.appendChild(document.createTextNode(labelText));

  input.className = 'form-control';
  input.id = id;
  input.placeholder = labelText;

  elem.appendChild(wrapper);
}

function appendSelect (elem, id, labelText, values) {
  var wrapper = document.createElement('div');
  var select = document.createElement('select');
  var label = document.createElement('label');

  wrapper.appendChild(label);
  wrapper.appendChild(select);
  wrapper.className = 'form-group';

  label.className = 'control-label';
  label.appendChild(document.createTextNode(labelText));

  select.className = 'form-control';
  select.id = id;

  select.appendChild(document.createElement('option'));

  if (values) {
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement('option');
      var textNode = document.createTextNode(values[i]);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  }

  elem.appendChild(wrapper);
}

(function ($) {
  $.fn.dynaform = function (options) {
    var elem = $(this);
    var formHorizontal = document.createElement('div');
    formHorizontal.className = 'form-horizontal';
    elem.append(formHorizontal);

    appendInput(formHorizontal, 'nome', 'Nome');
    appendInput(formHorizontal, 'email', 'Email');
    var fields = options.fields;
    if (fields) {
      appendSelect(formHorizontal, 'estado', 'Estado', options.fields.estado);
      appendSelect(formHorizontal, 'nivel', 'Nível', options.fields.nivel);
    }
    return this;
  };
})(jQuery);

