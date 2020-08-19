function contactController() {
  console.log('Se cargo página de contacto.');

  let firstName = $('#firstName');
  let email = $('#email');
  let comments = $('#comments');
  let submitButton = $('#submitButton');

  firstName.blur(requiredInputValue);
  comments.blur(requiredInputValue);

  email.blur(function() {
    let value = $(this).val();
    if (
      value === undefined ||
      value.length === 0 ||
      value.indexOf('@') === -1 ||
      value.indexOf('.') === -1
    ) {
      $(this).addClass('is-invalid');
    } else {
      $(this).removeClass('is-invalid');
      $(this).addClass('is-valid');
    }

    enableButton();
  });

  function requiredInputValue() {
    let value = $(this).val();
    if (value === undefined || value.length === 0) {
      $(this).addClass('is-invalid');
    } else {
      $(this).removeClass('is-invalid');
      $(this).addClass('is-valid');
    }

    enableButton();
  };

  function enableButton() {
    let property = true;

    if (
      !firstName.hasClass('is-invalid') &&
      !email.hasClass('is-invalid') &&
      !comments.hasClass('is-invalid')
    ) {
      property = false;
    }

    submitButton.attr('disabled', property);
  };

  // Reseteo de propiedades al enviar
  submitButton.click(function() {
    firstName.val('');
    firstName.removeClass('is-valid');
    email.val('');
    email.removeClass('is-valid');
    comments.val('');
    comments.removeClass('is-valid');
    submitButton.attr('disabled', true);
  });

  // Deshabilitación de buscador
  var search = $('#showForm');
  if (search.css('display') === 'block') {
    search.css('display', 'none')
  }
}
  
export default contactController;