// Abrir el popup
function abrirPopup(idPopup) {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById(idPopup);

  overlay.style.display = 'block';
  popup.style.display = 'block';
  popup.classList.add('active');

  // Si tienes transiciones CSS, el siguiente setTimeout puede ser opcional
  setTimeout(() => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';

      popup.style.opacity = '1';
      popup.style.visibility = 'visible';
  }, 100);
}

// Cerrar el popup
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

// Cerrar el popup si se hace clic fuera
function cerrarSiEsFuera(event, ...idPopups) {
  for (const idPopup of idPopups) {
      const popupElement = document.getElementById(idPopup);

      if (popupElement && popupElement.classList.contains('active') && event.target === event.currentTarget) {
          cerrarPopup(idPopup);
          return;
      }
  }
}

// Event listener para el overlay
document.getElementById('overlay').addEventListener('click', (event) => {
  cerrarSiEsFuera(event, 'popupEditar', 'popupVer');
});

// Event listener para los popups (Evitar que se cierren al hacer clic dentro del popup)
const popups = document.querySelectorAll('#popupEditar, #popupVer');
popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
      event.stopPropagation();
  });
});