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
      const rapidRating = data.chess_rapid.last.rating;
      const bulletRating = data.chess_bullet.last.rating;
      const blitzRating = data.chess_blitz.last.rating;
  
      // Mostrar los ratings en la consola
      console.log(`Rating en Chess Rapid: ${rapidRating}`);
      console.log(`Rating en Chess Bullet: ${bulletRating}`);
      console.log(`Rating en Chess Blitz: ${blitzRating}`);
  
      // Mostrar estos datos en la página web
      document.getElementById('rapidRating').innerText = rapidRating;
      document.getElementById('bulletRating').innerText = bulletRating;
      document.getElementById('blitzRating').innerText = blitzRating;
      
    } catch (error) {
      console.error('Hubo un problema con la solicitud de estadísticas:', error);
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
  
      // Mostrar los datos en la consola
      console.log(`Avatar: ${avatar}`);
      console.log(`Username: ${playerName}`);
  
      // Asignar la URL del avatar y el nombre de usuario
      document.getElementById('avatar').src = avatar;
      document.getElementById('username').innerText = playerName;

    } catch (error) {
      console.error('Hubo un problema con la solicitud del jugador:', error);
    }
  }
  
  obtenerEstadisticasJugador("daniclos");
  obtenerJugador("daniclos");