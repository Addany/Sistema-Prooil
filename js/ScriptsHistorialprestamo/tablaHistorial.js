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
  
  async function verHerramienta() {
    try {
        await solicitarNIP();
        abrirPopup('popupVer');
    } catch (error) {
        console.error(error);
    }
}

async function editarPrestamoForm(button) {
  try {
      await solicitarNIP();
      
      // Acceder a la fila del botón
      let row = button.closest('tr');
      
      // Extraer los datos de esta fila y llenar el popup
      document.getElementById("editFolio").value = row.querySelector('[data-label="Folio"]').innerText;
      document.getElementById("editNombreDelTrabajador").value = row.querySelector('[data-label="Nombre del Trabajador"]').innerText;

      // Convertir la fecha al formato adecuado
      let fechaTransaccion = row.querySelector('[data-label="Fecha de Transacción"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaTransaccion").value = fechaTransaccion;

      let fechaDevolucion = row.querySelector('[data-label="Fecha de Devolución"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaDevolucion").value = fechaDevolucion;
      
      // Ajustar el select para que coincida con el valor de la tabla
      document.getElementById("editQuienAutorizo").value = row.querySelector('[data-label="Quien Autorizó"]').innerText;

      document.getElementById("editObservaciones").value = row.querySelector('[data-label="Observaciones"]').innerText;

      // Ajustar el select de estado
      document.getElementById("editestado").value = row.querySelector('[data-label="Estado"]').innerText.toLowerCase();

      abrirPopup('popupEditar');
  } catch (error) {
      console.error(error);
  }
}




