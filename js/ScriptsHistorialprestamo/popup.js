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

function toggleInput(id, btn) {
  var input = document.getElementById(id);

  // Si el botón actual tiene un "-", cerramos el input/select correspondiente.
  if (btn.innerText === "-") {
      input.classList.add('hidden');
      btn.innerText = "+";
      btn.classList.remove('expanded');
      return;
  }

  // Si llegamos aquí, significa que se presionó un botón con "+"

  // Cerrar todos los inputs/selects y cambiar todos los botones a "+".
  var allInputs = document.querySelectorAll('.toggleInput');
  var allButtons = document.querySelectorAll('.inputWrapper button');

  allInputs.forEach(function(inputElement) {
      inputElement.classList.add('hidden');
  });

  allButtons.forEach(function(buttonElement) {
      buttonElement.innerText = "+";
      buttonElement.classList.remove('expanded');
  });

  // Ahora, abrimos el input/select correspondiente y cambiamos el símbolo del botón a "-".
  input.classList.remove('hidden');
  btn.innerText = "-";
  btn.classList.add('expanded');
}