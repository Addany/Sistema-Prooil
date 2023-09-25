function generarTablaHistorial(data) {
    const tabla = document.getElementById('tabla-historial').getElementsByTagName('tbody')[0];
    const fragment = document.createDocumentFragment();  
  
    data.forEach(item => {
        const newRow = tabla.insertRow();
        newRow.innerHTML = `
            <td data-label="Folio">${item.folio}</td>
            <td data-label="Nombre del Trabajador">${item.nombreTrabajador}</td>
            <td data-label="Fecha de Transacción">${item.fechaTransaccion}</td>
            <td data-label="Fecha de Devolución">${item.fechaDevolucion}</td>
            <td data-label="Quien Autorizó">${item.quienAutorizo}</td>
            <td data-label="Observaciones">${item.observaciones}</td>
            <td data-label="Estado">${item.estado}</td>
            <td data-label="Acciones">
                <button class="accion-button" onclick="verHerramienta('${item.folio}')">Ver</button>
                <button class="accion-button" onclick="editarPrestamoForm('${item.folio}')">Editar</button>
                <button class="accion-button" onclick="eliminarHerramienta('${item.folio}')">Eliminar</button>
            </td>
        `;
        fragment.appendChild(newRow); 
    });
    tabla.innerHTML = "";  
    tabla.appendChild(fragment);  
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
  
  async function verHerramienta(folio) {
    try {
      await solicitarNIP();
  
      const registro = historialPrestamo.find(item => item.folio === folio);
  
      if (registro) {
        const tbody = document.querySelector('#listaHerramientas tbody');
        tbody.innerHTML = registro.nombreHerramienta.map((herramienta, index) => `
            <tr>
                <td>
                    <input type="checkbox" id="herramienta-${registro.folio}-${index}">
                </td>
                <td>
                    <label for="herramienta-${registro.folio}-${index}">${herramienta.nombre}</label>
                </td>
                <td>${herramienta.serie}</td>
                <td>${herramienta.marca}</td>
            </tr>
        `).join('');
        abrirPopup('popupVer');
      } else {
        console.error('Registro no encontrado');
      }
    } catch (error) {
      console.error(error);
    }
}
  async function editarPrestamoForm(folio) {
    try {
      await solicitarNIP();
  
      const registro = historialPrestamo.find(item => item.folio === folio);
  
      if (registro) {
        document.getElementById("editFolio").value = registro.folio;
        document.getElementById("editNombreDelTrabajador").value = registro.nombreTrabajador; // CORRECCIÓN: cambio en el nombre del id
        document.getElementById("editFechaTransaccion").value = registro.fechaTransaccion; // CORRECCIÓN: cambio en el nombre del id
        document.getElementById("editFechaDevolucion").value = registro.fechaDevolucion; // CORRECCIÓN: cambio en el nombre del id
        document.getElementById("editQuienAutorizo").value = registro.quienAutorizo; // CORRECCIÓN: cambio en el nombre del id
        document.getElementById("editObservaciones").value = registro.observaciones;
        document.getElementById("editestado").value = registro.estado;
  
        abrirPopup('popupEditar');
      } else {
        console.error('Registro no encontrado');
      }
    } catch (error) {
      console.error(error);
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
  
  generarTablaHistorial(historialPrestamo);