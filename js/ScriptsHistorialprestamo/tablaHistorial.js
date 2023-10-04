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
      

      document.getElementById("editFolio").value = row.querySelector('[data-label="Folio"]').innerText;
      document.getElementById("editNombreDelTrabajador").value = row.querySelector('[data-label="Nombre del Trabajador"]').innerText;
      let fechaTransaccion = row.querySelector('[data-label="Fecha de Transacción"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaTransaccion").value = fechaTransaccion;
      let fechaDevolucion = row.querySelector('[data-label="Fecha de Devolución"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaDevolucion").value = fechaDevolucion;
      document.getElementById("editQuienAutorizo").value = row.querySelector('[data-label="Quien Autorizó"]').innerText;
      document.getElementById("editObservaciones").value = row.querySelector('[data-label="Observaciones"]').innerText;
      document.getElementById("editestado").value = row.querySelector('[data-label="Estado"]').innerText.toLowerCase();

      abrirPopup('popupEditar');
  } catch (error) {
      console.error(error);
  }
}




