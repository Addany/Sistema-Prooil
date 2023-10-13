
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
  
async function editarEntregaForm(button) {
  try {
      await solicitarNIP();

      let row = button.closest('tr');

      document.getElementById("editFolio").value = row.querySelector('[data-label="Folio"]').innerText;

      let fechaTransaccionStr = row.querySelector('[data-label="Fecha de Transacción"]').innerText;
      let partesFecha = fechaTransaccionStr.split("-");
      let fechaReformateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
      document.getElementById("editFechaTransaccion").value = fechaReformateada;

      document.getElementById("edittrabajadorSolicitante").value = row.querySelector('[data-label="Trabajador solicitante"]').innerText;
      document.getElementById("editQuienAutorizo").value = row.querySelector('[data-label="¿Quien Autorizó?"]').innerText;
      document.getElementById("editObservaciones").value = row.querySelector('[data-label="Observaciones"]').innerText;
      document.getElementById("editEstadoproceso").value = row.querySelector('[data-label="Status del proceso del entrega"]').innerText;

      abrirPopup('popupEditar');
  } catch (error) {
      console.error(error);
  }
}


async function editarAlmacenista(button) {
  try {
      await solicitarNIP();

      let row = button.closest('tr');

      document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"]').innerText;
      document.getElementById("editID").value = row.querySelector('[data-label="Usuario"]').innerText;
      document.getElementById("editNombre").value = row.querySelector('[data-label="Nombre"]').innerText;
      document.getElementById("editTelefono").value = row.querySelector('[data-label="Teléfono"]').innerText;
      document.getElementById("editCorreo").value = row.querySelector('[data-label="Correo"]').innerText;

      let fechaIngreso = row.querySelector('[data-label="Fecha de Ingreso"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaIngreso").value = fechaIngreso;

      abrirPopup('popupEditar');
  } catch (error) {
      console.error("Error al editar almacenista:", error);
  }
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
      let fechaRegistro = row.querySelector('[data-label="Fecha de Registro"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaRegistro").value = fechaRegistro;


      abrirPopup('popup');
  } catch (error) {
      console.error("Error en editarEPP:", error);
  }
}

async function editarHerramienta(button) {  
  try {

    await solicitarNIP();

    let row = button.closest('tr');
    
    document.getElementById("editFoto").src = row.querySelector('[data-label="Foto"] img').src;
    document.getElementById("editUsuario").value = row.querySelector('[data-label="ID"]').innerText;
    document.getElementById("editTipoherramienta").value = row.querySelector('[data-label="Tipo de herramienta"]').innerText;
    document.getElementById("editMarca").value = row.querySelector('[data-label="Marca"]').innerText;
    document.getElementById("editTamano").value = row.querySelector('[data-label="Tamaño"]').innerText;
    document.getElementById("editOrdenCompra").value = row.querySelector('[data-label="Orden de compra"]').innerText;
    document.getElementById("editNoSerie").value = row.querySelector('[data-label="No. Serie"]').innerText;
    document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"]').innerText.toLowerCase();
    document.getElementById("editColor").value = row.querySelector('[data-label="Color"]').innerText;
    let fecha = row.querySelector('[data-label="Fecha de Registro"]').innerText.split("-").reverse().join("-");
    document.getElementById("editFecha").value = fecha;
    document.getElementById("editEstatus").value = row.querySelector('[data-label="Estatus"]').innerText.toLowerCase();

    abrirPopup('popup');
  } catch (error) {
    console.error("Error al editar herramienta:", error);
  }
}

async function editarPrestamoForm(button) {
  try {
      await solicitarNIP();
      
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

async function editarTrabajador(button) {
  try {
      await solicitarNIP();

      let row = button.closest('tr');

      document.getElementById("editFoto").src = row.querySelector('[data-label="Foto"] img').src;
      document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"]').innerText;
      document.getElementById("editTipoRegistro").value = row.querySelector('[data-label="Tipo de Registro"]').innerText;
      document.getElementById("editID").value = row.querySelector('[data-label="ID"]').innerText;
      document.getElementById("editNombre").value = row.querySelector('[data-label="Nombre"]').innerText;
      document.getElementById("editArea").value = row.querySelector('[data-label="Area"]').innerText;
      document.getElementById("editTelefono").value = row.querySelector('[data-label="Teléfono"]').innerText;
      document.getElementById("editCorreo").value = row.querySelector('[data-label="Correo Electrónico"]').innerText;
     
      let fechaIngreso = row.querySelector('[data-label="Fecha de Ingreso"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaIngreso").value = fechaIngreso;

      abrirPopup('popupEditar');
  } catch (error) {
      console.error("Error al editar trabajador:", error);
  }
}

function actualizarFoto(event) {
  let inputFile = event.target;
  let fotoElement = document.getElementById("editFoto");
  
  if (inputFile.files && inputFile.files[0]) {
      let reader = new FileReader();
      
      reader.onload = function (e) {
          fotoElement.src = e.target.result;
      }
      
      reader.readAsDataURL(inputFile.files[0]);
  }
}