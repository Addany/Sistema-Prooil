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

async function verGenerarReporte() {
  try {
      abrirPopup('popupReporte');
  } catch (error) {
      console.error(error);
  }
}


async function editarAlmacenista(button) {
  try {
      await solicitarNIP();

      let row = button.closest('tr');

      document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"] span').innerText;
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

async function editarTrabajador(button) {
  try {
      await solicitarNIP();

      let row = button.closest('tr');
      let estado = row.querySelector('[data-label="Estado"] span').innerText;
      let tipoRegistro = row.querySelector('[data-label="Tipo de Registro"]').innerText;
      let nombre = row.querySelector('[data-label="Nombre"]').innerText;
      let area = row.querySelector('[data-label="Area"]').innerText;
      let telefono = row.querySelector('[data-label="Teléfono"]').innerText;
      let correo = row.querySelector('[data-label="Correo Electrónico"]').innerText;

      document.getElementById("editFoto").src = row.querySelector('[data-label="Foto"] img').src;
      document.getElementById("editEstado").value = estado;
      document.getElementById("editTipoRegistro").value = tipoRegistro;
      document.getElementById("editNombre").value = nombre;
      document.getElementById("editArea").value = area;
      document.getElementById("editTelefono").value = telefono;
      document.getElementById("editCorreo").value = correo;
      
      // Determina si el tipo de registro actual es Trabajador
      let esTrabajador = tipoRegistro.trim() === "Trabajador";

      // Desactiva la selección de tipo de registro solo si es un Trabajador
      document.getElementById("editTipoRegistro").disabled = esTrabajador;

      // Oculta la opción de Trabajador si el tipo de registro actual no es Trabajador
      let opcionTrabajador = document.querySelector('#editTipoRegistro option[value="Trabajador"]');
      opcionTrabajador.style.display = esTrabajador ? 'block' : 'none';

      // Si el área es "N/A", deshabilita el select de área
      document.getElementById("editArea").disabled = area.trim() === "N/A";

      abrirPopup('popupEditar');
  } catch (error) {
      console.error("Error al editar trabajador:", error);
  }
}

function resetearFiltros() {
  document.getElementsByName('tipo_herramienta')[0].value = '';
  document.getElementsByName('marca')[0].value = '';
  document.getElementsByName('orden')[0].value = 'fecha_registro DESC';
  document.getElementsByName('status')[0].value = '';
  
  location.href = window.location.pathname;
}


function zoomImagen(src) {
  // Crear el elemento overlay si aún no existe
  let overlay = document.getElementById('img-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'img-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    overlay.style.cursor = 'zoom-out';
    overlay.addEventListener('click', function() {
      overlay.style.display = 'none';
    });
    document.body.appendChild(overlay);
  }
  
  // Crear la imagen dentro del overlay
  let img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.margin = 'auto'; // Centra la imagen
  
  // Limpiar overlay y agregar la nueva imagen
  overlay.innerHTML = '';
  overlay.appendChild(img);
  
  // Mostrar el overlay
  overlay.style.display = 'flex';
}

// Agregar el evento click a todas las imágenes de la clase 'foto-trabajador'
document.querySelectorAll('.foto-trabajador, .imagen-herramienta, .imagen-epp').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', function() {
    zoomImagen(this.src); // Pasar el src de la imagen al hacer clic
  });
});

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


document.addEventListener('DOMContentLoaded', function() {
  // Selecciona todas las celdas de todas las tablas
  var celdas = document.querySelectorAll('td');
  
  // Agrega la clase inicial a todas las celdas
  celdas.forEach(function(celda) {
      celda.classList.add('celda-oculta');
  });

  // Función para observar las celdas
  var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
          if (entry.isIntersecting) {
              entry.target.classList.add('celda-visible');
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  // Observa cada celda
  celdas.forEach(function(celda) {
      observer.observe(celda);
  });
});

