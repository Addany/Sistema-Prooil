const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const registrationContainer = document.querySelector('.registration-container');
  registrationContainer.classList.add('fade-out');

  setTimeout(() => {
    // Aquí podrías realizar la autenticación real o registro del usuario
    // Por ahora, simplemente redireccionaremos a otra página (index.html)
    window.location.href = '/index.html';
  }, 500); // La animación tiene una duración de 0.5 segundos (500ms)
});

function goBackToIndex() {
  window.location.href = '/index.html';
}
