function generarTablaHistorial(data) {
  const tabla = document.getElementById('tabla-historial').getElementsByTagName('tbody')[0];
  const fragment = document.createDocumentFragment();  

  data.forEach(item => {
      const newRow = tabla.insertRow();
      newRow.innerHTML = `
      <td data-label="Foto"><img src="${item.foto}" alt="Foto de ${item.nombre}" class="imagen-epp" /></td>
      <td data-label="ID">${item.id}</td>
      <td data-label="Nombre">${item.nombre}</td>
      <td data-label="Cantidad">${item.cantidad}</td>
      <td data-label="Marca">${item.marca}</td>
      <td data-label="Modelo">${item.modelo}</td>
      <td data-label="Tipo">${item.tipo}</td>
      <td data-label="Clase">${item.clase}</td>
      <td data-label="Talla">${item.talla}</td>
      <td data-label="Orden de compra">${item.ordenCompra}</td>
      <td data-label="Fecha de Registro">${item.fechaRegistro}</td>
      <td data-label="Acciones">
          <button class="accion-button" onclick="generarReporte('${item.id}')">Generar reporte</button>
          <button class="accion-button" onclick="editarEPP('${item.id}')">Editar</button>
          <button class="accion-button" onclick="eliminarEPP('${item.id}')">Eliminar</button>
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


async function editarEPP(id) {  
  try {
    await solicitarNIP();

    const registro = historialEpp.find(item => {
        return Number(item.id) === Number(id);
    });

    if (registro) {
      document.getElementById("editFoto").value = registro.foto;
      document.getElementById("editId").value = registro.id;
      document.getElementById("editNombre").value = registro.nombre; 
      document.getElementById("editCantidad").value = registro.cantidad;
      document.getElementById("editMarca").value = registro.marca; 
      document.getElementById("editModelo").value = registro.modelo;
      document.getElementById("editTipo").value = registro.tipo;
      document.getElementById("editClase").value = registro.clase; 
      document.getElementById("editTalla").value = registro.talla;
      document.getElementById("editOrdenCompra").value = registro.ordenCompra;
      document.getElementById("editFechaRegistro").value = registro.fechaRegistro;

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