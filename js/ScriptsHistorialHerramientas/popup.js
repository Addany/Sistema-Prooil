function abrirPopup() {
  console.log("Intentando abrir popup");
  obtenerElemento('overlay').style.visibility = 'visible';
  obtenerElemento('overlay').style.opacity = '1';
  obtenerElemento('popup').style.display = 'block';  // Añadir esta línea
  obtenerElemento('popup').style.visibility = 'visible';
  
  // Agregar un pequeño retraso antes de cambiar la opacidad para permitir que el cambio de 'display' se complete
  setTimeout(() => {
    obtenerElemento('popup').style.opacity = '1';
  }, 20);
}

function cerrarPopup() {
  obtenerElemento('overlay').style.visibility = 'hidden';
  obtenerElemento('overlay').style.opacity = '0';
  obtenerElemento('popup').style.visibility = 'hidden';
  obtenerElemento('popup').style.opacity = '0';
  
  // Agregar un retraso antes de cambiar la propiedad 'display' para permitir que la transición de 'opacity' se complete
  setTimeout(() => {
    obtenerElemento('popup').style.display = 'none';
  }, 300);

}