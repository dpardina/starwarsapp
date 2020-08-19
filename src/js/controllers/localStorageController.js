import {setLocalList, getLocalList} from '../utils/localStorage';

function getSavedData() {
  if (getLocalList('list') === null) {
    return;
  }
  var charactersList = getLocalList('list');
  for (let i = 0; i < charactersList.length; i++) {
    let character = charactersList[i];

    $('#tableBody').append('<tr id="' + character.counter + '" style="overflow: hidden;"></tr>');
      $('#' + character.counter +'').append(`
        <td scope="col">` + character.counter + `</td>
        <td scope="col">` + character.name + `</td>
        <td scope="col">` + character.gender + `</td>
        <td scope="col">` + character.height + `</td>
        <td scope="col">` + character.mass + `</td>
        <td scope="col">` + character.eye_color + `</td>
        <td style="padding:0" class="align-middle"><button type="button" class="btn btn-danger">Eliminar</button></td>
      `);
  }

  // Botón de eliminar
  let deleteButton = $('.btn-danger');
  deleteButton.click(function() {
    let saveRow = $(this).parent().parent();

    // Eliminación de fila
    saveRow.fadeOut(0, function (){
      saveRow.remove();
    });

    // Eliminación de personaje en localStorage
    var characterIndex = saveRow.children()[0].innerHTML;
    var indexDeletion = '';

    for (let i = 0; i < charactersList.length; i++) {
      var character = charactersList[i];
      if (characterIndex === character.counter) {
        indexDeletion = i;
      }
    }

    if (indexDeletion !== '') {
      charactersList.splice(indexDeletion,1);
    }

    setLocalList('list', charactersList);
    console.log('Personaje Eliminado.');
  })
}

function localStorageController() {
  console.log('Se cargaron los personajes guardados.');
  getSavedData();

  // Habilitación de buscador
  var search = $('#showForm');
  if (search.css('display') === 'none') {
    search.css('display', 'block')
  }
}
  
export default localStorageController;