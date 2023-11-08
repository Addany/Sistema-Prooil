function abrirPopup(idPopup) {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById(idPopup);

  overlay.style.display = 'block';
  popup.style.display = 'block';
  popup.classList.add('active');

  setTimeout(() => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';

      popup.style.opacity = '1';
      popup.style.visibility = 'visible';
  }, 100);
}

function cerrarPopup(idPopup) {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById(idPopup);

  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';

  popup.style.opacity = '0';
  popup.style.visibility = 'hidden';
  popup.classList.remove('active');

  popup.addEventListener('transitionend', () => {
      overlay.style.display = 'none';
      popup.style.display = 'none';
  }, { once: true });
}


function cerrarSiEsFuera(event, ...idPopups) {
  for (const idPopup of idPopups) {
      const popupElement = document.getElementById(idPopup);

      if (popupElement && popupElement.classList.contains('active') && event.target === event.currentTarget) {
          cerrarPopup(idPopup);
          return;
      }
  }
}


document.getElementById('overlay').addEventListener('click', (event) => {
  cerrarSiEsFuera(event, 'popupEditar', 'popupVer','popupReporte');
});


const popups = document.querySelectorAll('#popupEditar, #popupVer,#popupVer');
popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
      event.stopPropagation();
  });
});