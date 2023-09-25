function generarTablaHistorial(data) {
  const tabla = document.getElementById('tabla-almacenistas').getElementsByTagName('tbody')[0];
  const fragment = document.createDocumentFragment();  

  data.forEach(item => {
      const newRow = tabla.insertRow();
      newRow.innerHTML = `
      <tr>
        <td data-label="Estado">${item.estado}</td>
        <td data-label="ID">${item.id}</td>
        <td data-label="Nombre">${item.nombre}</td>
        <td data-label="Teléfono">${item.telefono}</td>
        <td data-label="Correo">${item.correo}</td>
        <td data-label="Fecha de Ingreso">${item.fechaIngreso}</td>
        <td data-label="Acciones"><button class="accion-button" onclick="editarAlmacenista('${item.id}')">Editar</button></td>
      </tr>`;
      fragment.appendChild(newRow); 
  });
  tabla.innerHTML = "";  
  tabla.appendChild(fragment);  
}

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


async function editarAlmacenista(id) {  
  try {
    await solicitarNIP();

    const registro = historialAlmacenistas.find(item => {
        return Number(item.id) === Number(id);
    });

    if (registro) {
      document.getElementById("editEstado").value = registro.estado;
      document.getElementById("editID").value = registro.id;
      document.getElementById("editNombre").value = registro.nombre; 
      document.getElementById("editTelefono").value = registro.telefono;
      document.getElementById("editCorreo").value = registro.correo; 
      document.getElementById("editFechaIngreso").value = registro.fechaIngreso;


      abrirPopup('popupEditar');
    } else {
      console.error('Registro no encontrado');
    }
  } catch (error) {
    console.error("Error en editarEPP:", error);
  }
}


async function eliminarHerramienta(folio) {
  try {
    await solicitarNIP();

    // Aquí deberías colocar tu código para eliminar el registro con el folio dado
    // ...

  } catch (error) {
    console.error(error);
  }
}

// Aquí está la llamada para generar la tabla al cargar la página
generarTablaHistorial(historialAlmacenistas);