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

    // Revisa si el popup tiene la clase 'active' y si el click fue directamente en el overlay
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


function abrirPopup(idPopup) {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById(idPopup);
  
  overlay.style.display = 'block';
  popup.style.display = 'block';
  popup.classList.add('active');  // Asegúrate de agregar 'active' a la clase aquí
  
  // Puedes optar por no usar setTimeout si las transiciones CSS están configuradas adecuadamente
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
  popup.classList.remove('active');  // Asegúrate de remover 'active' de la clase aquí
  
  popup.addEventListener('transitionend', () => {
    overlay.style.display = 'none';
    popup.style.display = 'none';
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

document.getElementById('overlay').addEventListener('click', (event) => {
  cerrarSiEsFuera(event, 'popup', 'popupVer');
});
