function generarTablaHistorial(data) {
  const tabla = document.getElementById('tabla-historial').getElementsByTagName('tbody')[0];
  const fragment = document.createDocumentFragment();  

  data.forEach(item => {
      const newRow = tabla.insertRow();
      newRow.innerHTML = `
      <td data-label="Foto"><img src="${item.foto}" alt="Foto de ${item.nombre}" class="imagen-herramienta" /></td>
      <td data-label="ID">${item.id}</td>
      <td data-label="Tipo de herramienta">${item.tipoherramienta}</td>
      <td data-label="Marca">${item.marca}</td>
      <td data-label="Orden de compra">${item.ordenCompra}</td>
      <td data-label="Tamaño">${item.tamaño}</td>
      <td data-label="No. Serie">${item.noSerie}</td>
      <td data-label="Estado">${item.estado}</td>
      <td data-label="Color">${item.color}</td>
      <td data-label="Fecha de Registro">${item.fechaRegistro}</td>
      <td data-label="Descripción">${item.descripcion}</td>
      <td data-label="Estatus">${item.estatus}</td>
      <td data-label="Acciones">
          <button class="accion-button" onclick="descargarQRHerramienta('${item.id}')">Descargar QR</button>
          <button class="accion-button" onclick="editarHerramienta('${item.id}')">Editar</button>
          <button class="accion-button" onclick="eliminarHerramienta('${item.id}')">Eliminar</button>
      </td>
    `;
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


async function editarHerramienta(id) {  
  try {
    await solicitarNIP();

    const registro = historialHerramientas.find(item => {
        return Number(item.id) === Number(id);
    });

    if (registro) {
      document.getElementById("editFoto").value = registro.foto;
      document.getElementById("editId").value = registro.id;
      document.getElementById("editTipoherramienta").value = registro.tipoherramienta;
      document.getElementById("editMarca").value = registro.marca; 
      document.getElementById("editTamano").value = registro.tamaño;
      document.getElementById("editOrdenCompra").value = registro.ordenCompra; 
      document.getElementById("editNoSerie").value = registro.noSerie;
      document.getElementById("editEstado").value = registro.estado;
      document.getElementById("editColor").value = registro.color; 
      document.getElementById("editFecha").value = registro.fechaRegistro;
      document.getElementById("editDescripcion").value = registro.descripcion;
      document.getElementById("editEstatus").value = registro.estatus;

      abrirPopup('popup');
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
generarTablaHistorial(historialEpp);