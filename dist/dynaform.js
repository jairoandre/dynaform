/**
Dynaform plugin
**/
(function ($) {

  // constants
  var DIV = 'div';
  var NAME_ID = 'nome';
  var EMAIL_ID = 'email';
  var ESTADO_ID = 'estado';
  var NIVEL_ID = 'nivel';

  var panelOptions = {
    type: DIV,
    id: 'panel',
    className: 'panel panel-primary'
  };

  var panelHeadingOptions = {
    type: DIV,
    id: 'panel-heading',
    className: 'panel-heading'
  };

  var panelBodyOptions = {
    type: DIV,
    id: 'panel-body',
    className: 'panel-body',
    style: 'padding: 25px;'
  };

  var formOptions = {
    type: 'form',
    id: 'form'
  };

  var divInputOptions = {
    type: DIV,
    className: 'form-group'
  };

  var nomeOptions = {
    id: NAME_ID,
    label: 'Nome'
  };

  var emailOptions = {
    id: EMAIL_ID,
    label: 'Email'
  };

  var estadoOptions = {
    id: ESTADO_ID,
    label: 'Estado'
  };

  var nivelOptions = {
    id: NIVEL_ID,
    label: 'Nível'
  };

  /**
  Dynaform plugin
  **/

  $.fn.dynaform = function (options) {
    var panel = createElement(panelOptions);
    var panelHeading = createElement(panelHeadingOptions);
    var panelBody = createElement(panelBodyOptions);
    var form = createElement(formOptions);

    panelHeading.appendChild(createTextNode('Dynaform'));

    panel.appendChild(panelHeading);
    panel.appendChild(panelBody);
    panelBody.appendChild(form);

    form.appendChild(createInput(nomeOptions));
    form.appendChild(createInput(emailOptions));

    var fields = options.fields;
    if (fields) {
      form.appendChild(createSelect(estadoOptions, fields.estado));
      form.appendChild(createSelect(nivelOptions, fields.nivel));
    }

    form.appendChild(createButton());

    this.append(panel);
    return this;
  };

  function createElement (options) {
    var element = document.createElement(options.type);
    if (options.id) {
      element.id = options.id;
    }
    if (options.className) {
      element.className = options.className;
    }
    if (options.style) {
      element.style = options.style;
    }
    return element;
  }

  function createTextNode (text) {
    var textNode = document.createTextNode(text);
    return textNode;
  }

  function createInput (options) {
    var wrapper = createElement(divInputOptions);
    var input = document.createElement('input');
    var label = document.createElement('label');

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    label.className = 'control-label';
    label.appendChild(createTextNode(options.label));

    input.id = options.id;
    input.className = 'form-control';

    return wrapper;
  }

  function createSelect (options, values) {
    var wrapper = document.createElement(DIV);
    var select = document.createElement('select');
    var label = document.createElement('label');

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    wrapper.className = 'form-group';

    label.className = 'control-label';
    label.appendChild(createTextNode(options.label));

    select.id = options.id;
    select.className = 'form-control';

    select.appendChild(document.createElement('option'));

    if (values) {
      for (var i = 0; i < values.length; i++) {
        var option = document.createElement('option');
        option.appendChild(createTextNode(values[i]));
        select.appendChild(option);
      }
    }

    return wrapper;
  }

  function getValue (id) {
    return document.getElementById(id).value;
  }

  function clearValue (id) {
    document.getElementById(id).value = '';
  }

  function clearValues () {
    clearValue(NAME_ID);
    clearValue(EMAIL_ID);
    clearValue(ESTADO_ID);
    clearValue(NIVEL_ID);
  }

  function getData () {
    var name = getValue(NAME_ID);
    var email = getValue(EMAIL_ID);
    var estado = getValue(ESTADO_ID);
    var nivel = getValue(NIVEL_ID);

    var user = {name: name, email: email, estado: estado, nivel: nivel};

    return {user: user};
  }

  function postUser (ev) {
    ev.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/user',
      data: getData(),
      success: function (data, status, jqXHR) {
        console.log('Inserido com sucesso!')
        console.log(data);
      },
      dataType: 'json'
    });
    clearValues();
  }

  function createButton () {
    var buttonGroup = createElement({id: 'btnGroup', type: DIV, className: 'btn-group'});
    var button = createElement({id: 'button', type: 'button', className: 'btn btn-primary'});
    button.appendChild(createTextNode('Enviar'));
    button.onclick = postUser;
    buttonGroup.appendChild(button);
    return buttonGroup;
  }

})(jQuery);

