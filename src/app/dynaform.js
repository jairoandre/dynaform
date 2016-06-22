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

    panelHeading.appendChild(createTextNode('Dynaform'));

    panel.appendChild(panelHeading);
    panel.appendChild(panelBody);
    

    if (options.modal) {
      document.body.appendChild(modalDialog(options.fields));
      $(panelBody).append('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal">Cadastrar Usuário</button>')
    } else {
      var form = createElement(formOptions);
      appendFields(form, options.fields);
      form.appendChild(createButton());
      panelBody.appendChild(form);
    }

    this.append(panel);

    return this;
  };

  function appendFields(elem, fields) {
    elem.appendChild(createElement({type: DIV, id: 'msgs'}));
    elem.appendChild(createInput(nomeOptions));
    elem.appendChild(createInput(emailOptions));

    if (fields) {
      elem.appendChild(createSelect(estadoOptions, fields.estado));
      elem.appendChild(createSelect(nivelOptions, fields.nivel));
    }
  }

  function modalDialog (fields) {
    var modal = createElement({id: 'modal', type: DIV, className: 'modal fade'});
    var modalDialog = createElement({id: 'modal-dialog', type: DIV, className: 'modal-dialog'});
    var modalContent = createElement({id: 'modal-content', type: DIV, className: 'modal-content'});
    var modalHeader = createElement({id: 'modal-header', type: DIV, className: 'modal-header'});
    var modalBody = createElement({id: 'modal-body', type: DIV, className: 'modal-body'});
    var modalFooter = createElement({id: 'modal-footer', type: DIV, className: 'modal-footer'});
    var headerCloseBtn = createElement({id: 'button', type: 'button', className: 'close'});
    var $header = $(headerCloseBtn);
    var $modal = $(modal);
    $modal.attr('tabindex', '-1');
    $modal.attr('role', 'dialog');
    $modal.attr('aria-labelledby', 'myModalLabel');
    $header.attr('data-dismiss', 'modal');
    $header.attr('aria-label', 'Close');
    $header.append('<span aria-hidden="true">&times;</span>');
    modalHeader.appendChild(headerCloseBtn);
    $(modalHeader).append('<h4 class="modal-title">Incluir Usuário</h4>');
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    appendFields(modalBody, fields);
    modalFooter.appendChild(createButton());
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    return modal;
  }

  function addMsg (msg, severity) {
    var msgDiv = '<div class="alert alert-' + severity + '">' + msg + '</div>';
    $('#msgs').empty();
    $('#msgs').append(msgDiv);
  }

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
        addMsg('Usuário enviado', 'success');
      },
      error: function (jqXHR, status, error) {
        addMsg(jqXHR.responseText, 'warning');
      },
      dataType: 'json'
    });
    clearValues();
  }

  function createButton () {
    var buttonGroup = createElement({type: DIV, className: 'btn-group'});
    var button = createElement({id: 'button', type: 'button', className: 'btn btn-primary'});
    button.appendChild(createTextNode('Enviar'));
    button.onclick = postUser;
    buttonGroup.appendChild(button);
    return buttonGroup;
  }

})(jQuery);