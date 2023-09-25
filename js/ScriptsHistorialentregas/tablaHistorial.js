function generarTablaHistorial(data) {
    const tabla = document.getElementById('tabla-historial').getElementsByTagName('tbody')[0];
    const fragment = document.createDocumentFragment();  
  
    data.forEach(item => {
        const newRow = tabla.insertRow();
        newRow.innerHTML = `
            <td data-label="Folio">${item.folio}</td>
            <td data-label="Fecha de Transacción">${item.fechaTransaccion}</td>
            <td data-label="Trabajador solicitante">${item.trabajadorSolicitante}</td>
            <td data-label="Quien Autorizó">${item.quienAutorizo}</td>
            <td data-label="Observaciones">${item.observaciones}</td>
            <td data-label="Estado del proceso del entrega">${item.estado}</td>
            <td data-label="Acciones">
                <button class="accion-button" onclick="verHerramienta('${item.folio}')">Ver</button>
                <button class="accion-button" onclick="editarPrestamoForm('${item.folio}')">Editar</button>
                <button class="accion-button" onclick="eliminarHerramienta('${item.folio}')">Generar documento</button>
                <button class="accion-button" onclick="eliminarHerramienta('${item.folio}')">Generar reporte mensual</button>
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
        const tbody = document.querySelector('#listaEPP tbody');
        tbody.innerHTML = registro.nombreEPP.map((EPP) => `
            <tr>
                <td>${EPP.nombre}</td>
                <td>${EPP.modelo}</td>
                <td>${EPP.tipo}</td>
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
        document.getElementById("editFechaTransaccion").value = registro.fechaTransaccion; // CORRECCIÓN: cambio en el nombre del id
        document.getElementById("editQuienAutorizo").value = registro.quienAutorizo;
        document.getElementById("edittrabajadorSolicitante").value = registro.trabajadorSolicitante; 
        document.getElementById("editObservaciones").value = registro.observaciones;
        document.getElementById("editEstadoproceso").value = registro.estado;
  
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
  
  // Aquí está la llamada para generar la tabla al cargar la página
  generarTablaHistorial(historialPrestamo);