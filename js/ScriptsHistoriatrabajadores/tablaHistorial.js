
let nuevaFoto;  

function actualizarFoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      nuevaFoto = e.target.result;  
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


async function editarTrabajador(button) {
    try {
        await solicitarNIP();

        // Acceder a la fila del botón
        let row = button.closest('tr');

        // Llenar el formulario del popup con los datos de la fila
        document.getElementById("editFoto").src = row.querySelector('[data-label="Foto"] img').src;
        document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"]').innerText;
        document.getElementById("editTipoRegistro").value = row.querySelector('[data-label="Tipo de Registro"]').innerText;
        document.getElementById("editID").value = row.querySelector('[data-label="ID"]').innerText;
        document.getElementById("editNombre").value = row.querySelector('[data-label="Nombre"]').innerText;
        document.getElementById("editTelefono").value = row.querySelector('[data-label="Teléfono"]').innerText;
        document.getElementById("editCorreo").value = row.querySelector('[data-label="Correo Electrónico"]').innerText;
       
        // Convertir la fecha al formato adecuado para input de tipo 'date'
        let fechaIngreso = row.querySelector('[data-label="Fecha de Ingreso"]').innerText.split("-").reverse().join("-");
        document.getElementById("editFechaIngreso").value = fechaIngreso;

        abrirPopup('popupEditar');
    } catch (error) {
        console.error("Error al editar trabajador:", error);
    }
}

