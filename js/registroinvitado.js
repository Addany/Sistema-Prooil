const form = document.getElementById('registration-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const registrationContainer = document.querySelector('.registration-container');
  registrationContainer.classList.add('fade-out');

  setTimeout(() => {
    // Aquí podrías realizar el registro real del usuario
    // Por ahora, simplemente redireccionaremos a otra página (index.html)
    window.location.href = '/index.html';
  }, 500); // La animación tiene una duración de 0.5 segundos (500ms)
});

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
    const output = document.getElementById('output');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function goBackToIndex() {
  window.location.href = '/index.html';
}