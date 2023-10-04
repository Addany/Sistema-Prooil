let nuevaFoto;  

function actualizarFoto(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          nuevaFoto = e.target.result;
          document.getElementById("editFoto").src = nuevaFoto;  
      };
      reader.readAsDataURL(file);
  }
}


function solicitarNIP() {
  return new Promise((resolve, reject) => {
    const nip = prompt('Por favor, ingrese su NIP:');
    if (nip === '1234') {  // Cambia '1234' por el NIP real que deseas verificar
      resolve();
    } else {
      alert('NIP incorrecto');
      reject(new Error('NIP incorrecto'));
    }
  });
}


async function editarEPP(button) {
  try {
      await solicitarNIP();

      let row = button.closest('tr');

      document.getElementById("editFoto").src = row.querySelector('[data-label="Foto"] img').src;
      document.getElementById("editId").value = row.querySelector('[data-label="ID"]').innerText;
      document.getElementById("editNombre").value = row.querySelector('[data-label="Nombre"]').innerText;
      document.getElementById("editCantidad").value = row.querySelector('[data-label="Cantidad"]').innerText;
      document.getElementById("editMarca").value = row.querySelector('[data-label="Marca"]').innerText;
      document.getElementById("editModelo").value = row.querySelector('[data-label="Modelo"]').innerText;
      document.getElementById("editClase").value = row.querySelector('[data-label="Clase"]').innerText;
      document.getElementById("editTalla").value = row.querySelector('[data-label="Talla"]').innerText;
      document.getElementById("editOrdenCompra").value = row.querySelector('[data-label="Orden de compra"]').innerText;
      document.getElementById("editFechaRegistro").value = row.querySelector('[data-label="Fecha de Registro"]').innerText;

      abrirPopup('popup');
  } catch (error) {
      console.error("Error en editarEPP:", error);
  }
}