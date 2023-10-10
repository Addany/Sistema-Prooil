function abrirPopup(idPopup) {
  document.getElementById('overlay').style.visibility = 'visible';
  document.getElementById('overlay').style.opacity = '1';
  const popupElement = document.getElementById(idPopup);
  popupElement.style.visibility = 'visible';
  popupElement.style.opacity = '1';
}

function cerrarPopup(idPopup) {
  const popupElement = document.getElementById(idPopup);
  popupElement.style.opacity = '0';
  popupElement.style.visibility = 'hidden';
  
  popupElement.addEventListener('transitionend', () => {
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('overlay').style.visibility = 'hidden';
  }, { once: true });
}

function cerrarSiEsFuera(event, ...idPopups) {
  for (const idPopup of idPopups) {
    const popupElement = document.getElementById(idPopup);

    if (popupElement.style.display !== 'none' && event.target === event.currentTarget) {
      cerrarPopup(idPopup);
      return; 
    }
  }
}