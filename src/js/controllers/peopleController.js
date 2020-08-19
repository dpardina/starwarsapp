import {setLocalList, getLocalList} from '../utils/localStorage';

// Variables iniciales
var charactersList = [];
var counter = 0;
var pageCounter = 1;

// Validación de personaje en lista
function characterListValidation(nameParam) {
  if (charactersList.length === 0) return false;

  for (let i = 0; i < charactersList.length; i++) {
      let savedCharacter = charactersList[i];
      if (savedCharacter.name === nameParam) {
          return true;
      }
  }
  return false;
}

// Carga de lista de personajes
function getData(){
  var request = $.ajax({
    url: "https://swapi.dev/api/people/?page=" + pageCounter + "",
    method: "GET"
  })
  
  request.done(function(data) {
    for (let index = 0; index < data.results.length; index++) {
      const element = data.results[index];
      counter++;

      // Traducción de géneros
      let genderCharacter = '';
      switch (element.gender) {
        case 'male':
        genderCharacter = 'masculino'
        break
        case 'female':
        genderCharacter = 'femenino'
        break
        case 'hermaphrodite':
        genderCharacter = 'hermafrodita'
        break
        case 'none':
        genderCharacter = 'ninguno'
        break
        case 'n/a':
        genderCharacter = 'no aplica'
        break
      }

      // Traducción de color de ojos
      let eyeColorCharacter = '';
      switch (element.eye_color) {
        case 'blue':
        eyeColorCharacter = 'azul'
        break
        case 'yellow':
        eyeColorCharacter = 'amarillo'
        break
        case 'red':
        eyeColorCharacter = 'rojo'
        break
        case 'brown':
        eyeColorCharacter = 'marrón'
        break
        case 'blue-gray':
        eyeColorCharacter = 'azul grisáceo'
        break
        case 'black':
        eyeColorCharacter = 'negro'
        break
        case 'orange':
        eyeColorCharacter = 'naranja'
        break
        case 'hazel':
        eyeColorCharacter = 'avellana'
        break
        case 'pink':
        eyeColorCharacter = 'rosa'
        break
        case 'red, blue':
        eyeColorCharacter = 'rojo, azul'
        break
        case 'unknown':
        eyeColorCharacter = 'desconocido'
        break
        case 'gold':
        eyeColorCharacter = 'dorado'
        break
        case 'green, yellow':
        eyeColorCharacter = 'verde, amarillo'
        break
        case 'white':
        eyeColorCharacter = 'blanco'
        break
        case 'dark':
        eyeColorCharacter = 'oscuro'
        break
      }

      // Traducción de altura
      if (element.height === 'unknown') {
        element.height = '?'
      }

      // Traducción de peso
      if (element.mass === 'unknown') {
        element.mass = '?'
      }

      // Creación de tabla con info de personajes
      if (characterListValidation(element.name) === false) {
        $('#tableBody').append('<tr id="' + counter + '" style="overflow: hidden;"></tr>');
        $('#' + counter +'').append(`
            <td scope="col">` + counter + `</td>
            <td scope="col">` + element.name + `</td>
            <td scope="col">` + genderCharacter + `</td>
            <td scope="col">` + element.height + ` cm.</td>
            <td scope="col">` + element.mass + ` kg.</td>
            <td scope="col">` + eyeColorCharacter + `</td>
            <td style="padding:0" class="align-middle"><button type="button" class="btn btn-success">Guardar</button></td>
        `);
      }
    }
  });

  request.fail(function(error) {
    console.log( 'Error: ' ,error);
  });
}

function peopleController() {
  charactersList = getLocalList('list');
  counter = 0;
  pageCounter = 1;
  getData();

  // Habilitación de buscador
  var search = $('#showForm');
  if (search.css('display') === 'none') {
    search.css('display', 'block')
  }

  // Buscador
  var searchButton = $('#searchButton');
  var search = $('#search');
  searchButton.click(function(){
    var filter = search.val().toUpperCase();
    var table = $('#tableBody');
    var tr = table.children();
    for (let index = 0; index < tr.length; index++) {
      let trJquery = $(tr[index]);
      const td = trJquery.children()[1];
      console.log(td.innerHTML);
      let txtValue = td.innerHTML;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        trJquery.css('display', '');
      } else {
        trJquery.css('display', 'none');
      }
    }
  })

  // Cancelación de búsqueda
  search.on('input', function(){
    var table = $('#tableBody');
    var tr = table.children();
    if (search.val() === '') {
      tr.css('display', '');
    }
  })

  search.keydown('input', function(){
    var table = $('#tableBody');
    var tr = table.children();
    if (search.val() === '') {
      tr.css('display', '');
    }
  })

  // Botón de ver más
  var seeMore = $('#seeMore');
  seeMore.click(function() {
    if (pageCounter === 8){
      seeMore.attr('disabled', true);
    }
    pageCounter++;
    getData();
  });
}

// Botón de Guardar
$('body').on('click','.btn-success', function() {
  let saveRow = $(this).parent().parent();

  // Eliminación de la fila
  saveRow.fadeOut(0, function (){
    saveRow.remove();
  });

  // Guardado en LocalStorage
  var newCharacter = {
    counter: saveRow.children()[0].innerHTML,
    name: saveRow.children()[1].innerHTML,
    gender: saveRow.children()[2].innerHTML,
    height: saveRow.children()[3].innerHTML,
    mass: saveRow.children()[4].innerHTML,
    eye_color: saveRow.children()[5].innerHTML,
  }
  charactersList.push(newCharacter);
  setLocalList('list', charactersList);
})

export default peopleController;