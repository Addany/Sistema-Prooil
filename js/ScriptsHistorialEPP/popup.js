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