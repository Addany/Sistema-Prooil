function abrirPopup(idPopup) {
  document.getElementById('overlay').style.display = 'flex';
  const popupElement = document.getElementById(idPopup);
  popupElement.style.display = 'block';
  popupElement.classList.add('active'); // Añadir la clase 'active'
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
    popupElement.classList.remove('active'); // Remover la clase 'active'
    document.getElementById('overlay').style.display = 'none';
  }, { once: true });
}


function cerrarSiEsFuera(event, ...idPopups) {
  for (const idPopup of idPopups) {
    const popupElement = document.getElementById(idPopup);

    if (popupElement.classList.contains('active') && event.target === event.currentTarget) {
      cerrarPopup(idPopup);
      return;
    }
  }
}


const popups = document.querySelectorAll('#popupEditar, #popupVer');
popups.forEach(popup => {
    popup.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

document.getElementById('overlay').addEventListener('click', (event) => {
  cerrarSiEsFuera(event, 'popupEditar', 'popupVer');
});