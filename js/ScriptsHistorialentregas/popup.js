function abrirPopup(idPopup) {
  document.getElementById('overlay').style.display = 'flex';
  const popupElement = document.getElementById(idPopup);
  popupElement.style.display = 'block';
  setTimeout(() => {
    popupElement.style.visibility = 'visible';
    popupElement.style.opacity = '1';
  }, 0);
}

function cerrarPopup(idPopup) {
  const popupElement = document.getElementById(idPopup);
  popupElement.style.opacity = '0';

  popupElement.addEventListener('transitionend', () => {
    popupElement.style.visibility = 'hidden';
    popupElement.style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }, { once: true });
}

function cerrarSiEsFuera(event, idPopup) {
  const popupElement = document.getElementById(idPopup);
  
  if (event.target === event.currentTarget) {
      cerrarPopup(idPopup);
  }
}
