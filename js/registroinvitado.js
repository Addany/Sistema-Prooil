document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      try {
          const response = await fetch('tu_endpoint_url_aqui', {
              method: 'POST',
              body: formData
          });

          if (response.ok) {
              const jsonResponse = await response.json();
              console.log('Respuesta del servidor:', jsonResponse);
              alert('Registro exitoso');
          } else {
              alert('Error en el registro: ' + response.statusText);
          }
      } catch (error) {
          console.error('Error en el registro:', error);
          alert('Error en el registro: ' + error.message);
      }
  });
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