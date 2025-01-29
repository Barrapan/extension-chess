// Función para obtener las estadísticas de un jugador de Chess.com
async function obtenerEstadisticasJugador(username) {
  const url = `https://api.chess.com/pub/player/${username}/stats`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Si la respuesta no es exitosa, mostramos un mensaje de error
      throw new Error('Jugador no encontrado');
    }
    const data = await response.json();

    // Extraemos los ratings de cada modalidad
    const dailyRating = data.chess_daily?.last?.rating || 0;
    const rapidRating = data.chess_rapid?.last?.rating || 0;
    const bulletRating = data.chess_bullet?.last?.rating || 0;
    const blitzRating = data.chess_blitz?.last?.rating || 0;
    const puzzlesRating = data.tactics?.highest?.rating || 0;

    // Mostrar estos datos en la página web
    document.getElementById('dailyRating').innerText = dailyRating;
    document.getElementById('rapidRating').innerText = rapidRating;
    document.getElementById('bulletRating').innerText = bulletRating;
    document.getElementById('blitzRating').innerText = blitzRating;
    document.getElementById('puzzlesRating').innerText = puzzlesRating;

    // Ocultar el mensaje de error si el jugador se encuentra
    document.getElementById('errorMessage').style.display = 'none';

    // Ocultar o mostrar los datos según las casillas seleccionadas
    actualizarVista();

  } catch (error) {
    console.error('Hubo un problema con la solicitud de estadísticas:', error);

    // Mostrar el mensaje de error
    document.getElementById('errorMessage').style.display = 'block';

    // Establecer todos los ratings a 0
    document.getElementById('dailyRating').innerText = 0;
    document.getElementById('rapidRating').innerText = 0;
    document.getElementById('bulletRating').innerText = 0;
    document.getElementById('blitzRating').innerText = 0;
    document.getElementById('puzzlesRating').innerText = 0;

    // Ocultar o mostrar los datos según las casillas seleccionadas
    actualizarVista();
  }
}

// Función para obtener el jugador de Chess.com (perfil)
async function obtenerJugador(username) {
  const url = `https://api.chess.com/pub/player/${username}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Si la respuesta no es exitosa, mostramos un mensaje de error
      throw new Error('Jugador no encontrado');
    }
    const data = await response.json();

    // Extraemos el avatar y el nombre de usuario
    const avatar = data.avatar;
    const playerName = data.username;

    // Asignar la URL del avatar y el nombre de usuario
    document.getElementById('avatar').src = avatar;
    document.getElementById('username').innerText = playerName;

    // Ocultar el mensaje de error si el jugador se encuentra
    document.getElementById('errorMessage').style.display = 'none';

  } catch (error) {
    console.error('Hubo un problema con la solicitud del jugador:', error);

    // Mostrar el mensaje de error
    document.getElementById('errorMessage').style.display = 'block';

    // Establecer el avatar y el nombre de usuario a valores predeterminados
    document.getElementById('avatar').src = ''; // Puedes poner una imagen por defecto si lo deseas
    document.getElementById('username').innerText = 'Jugador no encontrado';
  }
}

// Función para actualizar la vista según las casillas seleccionadas
function actualizarVista() {
  const dailyChecked = document.getElementById('dailyCheckbox').checked;
  const bulletChecked = document.getElementById('bulletCheckbox').checked;
  const blitzChecked = document.getElementById('blitzCheckbox').checked;
  const rapidChecked = document.getElementById('rapidCheckbox').checked;
  const puzzlesChecked = document.getElementById('puzzlesCheckbox').checked;
  
  // Ocultar o mostrar los contenedores según las casillas seleccionadas
  document.getElementById('dailyBox').style.display = dailyChecked ? 'block' : 'none';
  document.getElementById('bulletBox').style.display = bulletChecked ? 'block' : 'none';
  document.getElementById('blitzBox').style.display = blitzChecked ? 'block' : 'none';
  document.getElementById('rapidBox').style.display = rapidChecked ? 'block' : 'none';
  document.getElementById('puzzlesBox').style.display = puzzlesChecked ? 'block' : 'none';
}

const boton = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
  const username = document.getElementById('search').value;
  obtenerJugador(username);
  obtenerEstadisticasJugador(username);
});

// Escuchar cambios en las casillas de verificación
document.getElementById('dailyCheckbox').addEventListener('change', actualizarVista);
document.getElementById('bulletCheckbox').addEventListener('change', actualizarVista);
document.getElementById('blitzCheckbox').addEventListener('change', actualizarVista);
document.getElementById('rapidCheckbox').addEventListener('change', actualizarVista);
document.getElementById('puzzlesCheckbox').addEventListener('change', actualizarVista);


// Función para generar la URL
function generarEnlace(username) {
  const baseUrl = window.location.href.split('/').slice(0, -1).join('/'); // Obtiene la URL base sin el archivo actual

  // Obtener el estado de las casillas de verificación
  const dailyChecked = document.getElementById('dailyCheckbox').checked;
  const bulletChecked = document.getElementById('bulletCheckbox').checked;
  const blitzChecked = document.getElementById('blitzCheckbox').checked;
  const rapidChecked = document.getElementById('rapidCheckbox').checked;
  const puzzlesChecked = document.getElementById('puzzlesCheckbox').checked;

  // Crear el enlace con los parámetros de las casillas seleccionadas
  const enlace = `${baseUrl}/preview.html?username=${username}&daily=${dailyChecked}&bullet=${bulletChecked}&blitz=${blitzChecked}&rapid=${rapidChecked}&puzzles=${puzzlesChecked}`;
  
  return enlace;
}

// Escuchar el clic en el botón de generar enlace
document.getElementById('generateBtn').addEventListener('click', () => {
  const username = document.getElementById('search').value;
  if (username) {
    const enlace = generarEnlace(username);
    const urlContainer = document.getElementById('urlContainer');
    const generatedUrl = document.getElementById('generatedUrl');

    generatedUrl.href = enlace;
    generatedUrl.innerText = enlace;
    urlContainer.style.display = 'block';
  } else {
    alert('Por favor, ingresa un nombre de usuario antes de generar el enlace.');
  }
});

// Función para obtener el nombre de usuario de la URL
function obtenerUsernameDeUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('username');
}

// Cargar los datos del jugador si hay un nombre de usuario en la URL
window.onload = () => {
  const username = obtenerUsernameDeUrl();
  if (username) {
    document.getElementById('search').value = username;
    obtenerJugador(username);
    obtenerEstadisticasJugador(username);
  }
};