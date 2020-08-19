function homeController() {
  console.log('Se cargo Home.');

  // Deshabilitación de buscador
  var search = $('#showForm');
  if (search.css('display') === 'block') {
    search.css('display', 'none')
  }
}

export default homeController;