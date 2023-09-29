
  
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

      let row = button.closest('tr');

      document.getElementById("editFolio").value = row.querySelector('[data-label="Folio"]').innerText;
      document.getElementById("editFechaTransaccion").value = row.querySelector('[data-label="Fecha de Transacción"]').innerText;
      document.getElementById("edittrabajadorSolicitante").value = row.querySelector('[data-label="Trabajador solicitante"]').innerText;
      document.getElementById("editQuienAutorizo").value = row.querySelector('[data-label="Quien Autorizó"]').innerText;
      document.getElementById("editObservaciones").value = row.querySelector('[data-label="Observaciones"]').innerText;
      document.getElementById("editEstadoproceso").value = row.querySelector('[data-label="Estado del proceso del entrega"]').innerText;

      abrirPopup('popupEditar');
  } catch (error) {
      console.error(error);
  }
}
