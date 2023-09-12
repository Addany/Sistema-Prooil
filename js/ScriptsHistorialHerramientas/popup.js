function abrirPopup(id) {
  obtenerElemento('overlay').style.display = 'block';
  obtenerElemento('popup').style.display = 'block';
}

function cerrarPopup() {
  obtenerElemento('overlay').style.display = 'none';
  obtenerElemento('popup').style.display = 'none';
}
