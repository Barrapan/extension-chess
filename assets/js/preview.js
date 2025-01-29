// Función para obtener el nombre de usuario de la URL
function obtenerUsernameDeUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('username');
  }
  
  // Función para aplicar los colores seleccionados
  function aplicarColores() {
    const params = new URLSearchParams(window.location.search);
    const backgroundColor = `#${params.get('bg')}` || '#ffffff'; // Color de fondo por defecto
    const textColor = `#${params.get('text')}` || '#000000'; // Color del texto por defecto
  
    // Aplicar los colores al contenedor
    const container = document.querySelector('.container');
    container.style.backgroundColor = backgroundColor;
    container.style.color = textColor;

    // Aplicar el color del texto a todos los elementos de texto dentro del contenedor
    const textElements = container.querySelectorAll('h3, p, span');
    textElements.forEach(element => {
        element.style.color = textColor;
    });
  }
  
  // Función para cargar los datos del jugador
  async function cargarDatosJugador(username) {
    try {
      // Obtener el perfil del jugador
      const perfilResponse = await fetch(`https://api.chess.com/pub/player/${username}`);
      if (!perfilResponse.ok) throw new Error('Jugador no encontrado');
      const perfilData = await perfilResponse.json();
  
      // Mostrar el avatar y el nombre de usuario
      document.getElementById('avatar').src = perfilData.avatar;
      document.getElementById('username').innerText = perfilData.username;
  
      // Obtener las estadísticas del jugador
      const statsResponse = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
      if (!statsResponse.ok) throw new Error('Estadísticas no encontradas');
      const statsData = await statsResponse.json();
  
      // Mostrar los ratings
      document.getElementById('dailyRating').innerText = statsData.chess_daily?.last?.rating || 0;
      document.getElementById('bulletRating').innerText = statsData.chess_bullet?.last?.rating || 0;
      document.getElementById('blitzRating').innerText = statsData.chess_blitz?.last?.rating || 0;
      document.getElementById('rapidRating').innerText = statsData.chess_rapid?.last?.rating || 0;
      document.getElementById('puzzlesRating').innerText = statsData.tactics?.highest?.rating || 0;
  
      // Ocultar o mostrar las modalidades según los parámetros de la URL
      const params = new URLSearchParams(window.location.search);
      document.getElementById('dailyBox').style.display = params.get('daily') === 'true' ? 'block' : 'none';
      document.getElementById('bulletBox').style.display = params.get('bullet') === 'true' ? 'block' : 'none';
      document.getElementById('blitzBox').style.display = params.get('blitz') === 'true' ? 'block' : 'none';
      document.getElementById('rapidBox').style.display = params.get('rapid') === 'true' ? 'block' : 'none';
      document.getElementById('puzzlesBox').style.display = params.get('puzzles') === 'true' ? 'block' : 'none';
  
    } catch (error) {
      console.error('Error al cargar los datos del jugador:', error);
  
      // Establecer el avatar y el nombre de usuario a valores predeterminados
      document.getElementById('avatar').src = ''; // Puedes poner una imagen por defecto si lo deseas
      document.getElementById('username').innerText = 'Jugador no encontrado';
  
      // Establecer todos los ratings a 0
      document.getElementById('dailyRating').innerText = 0;
      document.getElementById('bulletRating').innerText = 0;
      document.getElementById('blitzRating').innerText = 0;
      document.getElementById('rapidRating').innerText = 0;
      document.getElementById('puzzlesRating').innerText = 0;
  
      // Ocultar o mostrar las modalidades según los parámetros de la URL
      const params = new URLSearchParams(window.location.search);
      document.getElementById('dailyBox').style.display = params.get('daily') === 'true' ? 'block' : 'none';
      document.getElementById('bulletBox').style.display = params.get('bullet') === 'true' ? 'block' : 'none';
      document.getElementById('blitzBox').style.display = params.get('blitz') === 'true' ? 'block' : 'none';
      document.getElementById('rapidBox').style.display = params.get('rapid') === 'true' ? 'block' : 'none';
      document.getElementById('puzzlesBox').style.display = params.get('puzzles') === 'true' ? 'block' : 'none';
    }
  }
  

  
  // Cargar los datos del jugador al cargar la página, aplicar los colores y redimensionar la ventana
  window.onload = () => {
    const username = obtenerUsernameDeUrl();
    if (username) {
      aplicarColores(); // Aplicar los colores seleccionados
      cargarDatosJugador(username); // Cargar los datos del jugador
    } else {
      console.error('No se proporcionó un nombre de usuario en la URL.');
    }
  };