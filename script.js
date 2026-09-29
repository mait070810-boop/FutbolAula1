// Filtrar las tarjetas mientras se escribe.
const busqueda = document.getElementById('busqueda');
const tarjetas = document.querySelectorAll('.tarjeta');
const perfil = document.getElementById('perfil');


function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


function filtrar() {
  const texto = normalizar(busqueda.value.trim());
  let cantidad = 0;

  tarjetas.forEach(function(tarjeta) {
    const datos = normalizar(tarjeta.dataset.nombre + ' ' + tarjeta.dataset.posicion);

    tarjeta.hidden = !datos.includes(texto);

    if (!tarjeta.hidden) cantidad++;
  });

  document.getElementById('resultado').textContent = cantidad === 0
    ? 'No se encontraron jugadores.'
    : 'Jugadores encontrados: ' + cantidad;
}


busqueda.addEventListener('input', filtrar);

document.getElementById('limpiar').addEventListener('click', function() {
  busqueda.value = '';
  filtrar();
  busqueda.focus();
});


// Mostrar el perfil de la tarjeta seleccionada.
document.querySelectorAll('.ver-perfil').forEach(function(boton) {
  boton.addEventListener('click', function() {
    const jugador = boton.closest('.tarjeta').dataset;

    document.getElementById('nombre-perfil').textContent = jugador.nombre;

    document.getElementById('datos-perfil').textContent =
      'Número: ' + jugador.numero +
      ' · Posición: ' + jugador.posicion +
      ' · Edad: ' + jugador.edad + ' años.';

    perfil.showModal();
  });
});