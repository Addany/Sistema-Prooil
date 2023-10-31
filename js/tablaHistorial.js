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
  
async function verDatos() {
    try {
        abrirPopup('popupVer');
    } catch (error) {
        console.error(error);
    }
}
  
async function editarEntregaForm(button) {

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
}


async function editarAlmacenista(button) {
  try {
      await solicitarNIP();

      let row = button.closest('tr');

      document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"]').innerText;
      document.getElementById("editNombre").value = row.querySelector('[data-label="Nombre"]').innerText;
      document.getElementById("editTelefono").value = row.querySelector('[data-label="Teléfono"]').innerText;
      document.getElementById("editCorreo").value = row.querySelector('[data-label="Correo"]').innerText;

      abrirPopup('popupEditar');
  } catch (error) {
      console.error("Error al editar almacenista:", error);
  }
}

async function editarEPP(button) {

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
}

async function editarHerramienta(button) {  

    let row = button.closest('tr');
    
    document.getElementById("editTipoherramienta").value = row.querySelector('[data-label="Tipo de herramienta"]').innerText;
    document.getElementById("editMarca").value = row.querySelector('[data-label="Marca"]').innerText;
    document.getElementById("editTamano").value = row.querySelector('[data-label="Tamaño"]').innerText;
    document.getElementById("editOrdenCompra").value = row.querySelector('[data-label="Orden de compra"]').innerText;
    document.getElementById("editNoSerie").value = row.querySelector('[data-label="No. Serie"]').innerText;
    document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"]').innerText.toLowerCase();
    document.getElementById("editColor").value = row.querySelector('[data-label="Color"]').innerText;
    let fecha = row.querySelector('[data-label="Fecha de Registro"]').innerText.split("/").reverse().join("-");
    document.getElementById("editFecha").value = fecha;    

    abrirPopup('popup');

}

async function editarPrestamoForm(button) {
      
      let row = button.closest('tr');
      
      document.getElementById("editFolio").value = row.querySelector('[data-label="Folio"]').innerText;
      document.getElementById("editNombreDelTrabajador").value = row.querySelector('[data-label="Nombre del Trabajador"]').innerText;
      let fechaTransaccion = row.querySelector('[data-label="Fecha de Transacción"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaTransaccion").value = fechaTransaccion;
      let fechaDevolucion = row.querySelector('[data-label="Fecha de Devolución"]').innerText.split("-").reverse().join("-");
      document.getElementById("editFechaDevolucion").value = fechaDevolucion;
      document.getElementById("editQuienAutorizo").value = row.querySelector('[data-label="Quien Autorizó"]').innerText;
      document.getElementById("editestado").value = row.querySelector('[data-label="Estado"]').innerText.toLowerCase();

      abrirPopup('popupEditar');

}

async function editarTrabajador(button) {
  try {
      await solicitarNIP();

      let row = button.closest('tr');
      document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"]').innerText;
      document.getElementById("editTipoRegistro").value = row.querySelector('[data-label="Tipo de Registro"]').innerText;
      document.getElementById("editNombre").value = row.querySelector('[data-label="Nombre"]').innerText;
      document.getElementById("editArea").value = row.querySelector('[data-label="Area"]').innerText;
      document.getElementById("editTelefono").value = row.querySelector('[data-label="Teléfono"]').innerText;
      document.getElementById("editCorreo").value = row.querySelector('[data-label="Correo Electrónico"]').innerText;
     
      if (row.querySelector('[data-label="Tipo de Registro"]').innerText.trim() === "Trabajador") {
          document.getElementById("editTipoRegistro").disabled = true;
      } else {
          document.getElementById("editTipoRegistro").disabled = false;
      }

      if (row.querySelector('[data-label="Tipo de Registro"]').innerText.trim() !== "Trabajador") {
        document.querySelector('#editTipoRegistro option[value="Trabajador"]').style.display = 'none';
      } else {
          document.querySelector('#editTipoRegistro option[value="Trabajador"]').style.display = 'block';
      }

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


function resetearFiltros() {
  document.getElementById('fechaInicio').value = '';
  document.getElementsByName('tipo_herramienta')[0].value = '';
  document.getElementsByName('marca')[0].value = '';
  document.getElementsByName('orden')[0].value = 'fecha_registro DESC';
  document.getElementsByName('status')[0].value = '';
  
  location.href = window.location.pathname;
}


