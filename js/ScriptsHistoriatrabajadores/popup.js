function abrirPopup(idPopup) {
  console.log('Intentando abrir el popup:', idPopup);
  document.getElementById('overlay').style.visibility = 'visible';
  document.getElementById('overlay').style.opacity = '1';
  const popupElement = document.getElementById(idPopup);
  popupElement.style.visibility = 'visible';
  popupElement.style.opacity = '1';
}

function cerrarPopup(idPopup) {
  console.log('Intentando cerrar el popup:', idPopup);
  const popupElement = document.getElementById(idPopup);
  popupElement.style.opacity = '0';
  popupElement.style.visibility = 'hidden';
  
  popupElement.addEventListener('transitionend', () => {
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('overlay').style.visibility = 'hidden';
  }, { once: true });
}
