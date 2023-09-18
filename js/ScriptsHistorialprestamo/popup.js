function abrirPopup(idPopup) {
  document.getElementById('overlay').style.display = 'flex';
  document.getElementById(idPopup).style.display = 'flex';
}

function cerrarPopup(idPopup) {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById(idPopup).style.display = 'none';
}