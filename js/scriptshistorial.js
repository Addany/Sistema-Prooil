const historialPrestamo = [
  {
      folio: "12345",
      nombreTrabajador: "Juan Perez",
      fechaTransaccion: "2023-08-03",
      fechaDevolucion: "2023-08-05",
      quienAutorizo: "Admin12343",
      observaciones: "Desgaste y perdida",
      nombreHerramienta: ["Taladro", "Martillo"],
  },
  {
    folio: "237584",
    nombreTrabajador: "Lopez Addan",
    fechaTransaccion: "2023-08-01",
    fechaDevolucion: "2023-08-05",
    quienAutorizo: "Admin11",
    observaciones: "Desgaste y mas desgaste",
    nombreHerramienta: ["Taladro", "Martillo"],
},

];

function generarTablaHistorial(data) {
  const tabla = document.getElementById('tabla-historial').getElementsByTagName('tbody')[0];
  const fragment = document.createDocumentFragment();  // Crear un fragmento de documento

  data.forEach(item => {
    const newRow = tabla.insertRow();
    newRow.innerHTML = `
          <td>${item.folio}</td>
          <td>${item.nombreTrabajador}</td>
          <td>${item.fechaTransaccion}</td>
          <td>${item.fechaDevolucion}</td>
          <td>${item.quienAutorizo}</td>
          <td>${item.observaciones}</td>
          <td>
              <button class="accion-button" onclick="verHerramienta('${item.folio}')">Ver</button>
              <button class="accion-button" onclick="editarPrestamoForm('${item.folio}')">Editar</button> <!-- CORRECCIÓN: cambio en el nombre de la función -->
              <button class="accion-button" onclick="eliminarHerramienta('${item.folio}')">Eliminar</button>
          </td>
      `;
      fragment.appendChild(newRow); 
  });
  tabla.innerHTML = "";  // Limpia la tabla
  tabla.appendChild(fragment);  // Inserta todas las filas de una sola vez
}



function buscar() {
  const textoBuscar = document.getElementById('buscador').value.trim().toLowerCase();
  const fechaBuscar = document.getElementById('fecha').value;
  const categoriaBuscar = document.getElementById('categoria').value;

  const resultados = historialPrestamo.filter(item => {
      const itemMinusculas = {
          folio: item.folio?.trim().toLowerCase(),
          nombreTrabajador: item.nombreTrabajador?.trim().toLowerCase(),
          quienAutorizo: item.quienAutorizo?.trim().toLowerCase(),
          observaciones: item.observaciones?.trim().toLowerCase(),
      };

      return (
          (textoBuscar ? 
              itemMinusculas.folio.includes(textoBuscar) ||
              itemMinusculas.nombreTrabajador.includes(textoBuscar) ||
              itemMinusculas.quienAutorizo.includes(textoBuscar) ||
              itemMinusculas.observaciones.includes(textoBuscar) : true
          ) && 
          (fechaBuscar ? 
              item.fechaTransaccion.includes(fechaBuscar) || 
              item.fechaDevolucion.includes(fechaBuscar) : true
          ) &&
          (categoriaBuscar !== 'todos' ? item.estatus === categoriaBuscar : true)
      );
  });

  generarTablaHistorial(resultados);
}

let cacheBusqueda = new Map();

function buscarHerramienta(texto) {
  texto = texto.toLowerCase();
  
  if(cacheBusqueda.has(texto)) {
    return generarTablaHistorial(cacheBusqueda.get(texto));
  }
  
  const resultadosIndices = new Set();
  
  for(const campo in indiceTexto) {
    if(indiceTexto[campo].has(texto)) {
      indiceTexto[campo].get(texto).forEach(index => resultadosIndices.add(index));
    }
  }
  
  const resultados = [...resultadosIndices].map(index => historialPrestamo[index]);
  cacheBusqueda.set(texto, resultados);
  
  generarTablaHistorial(resultados);
}

function abrirPopup(idPopup) {
  document.getElementById('overlay').style.display = 'flex';
  document.getElementById(idPopup).style.display = 'flex';
}

function cerrarPopup(idPopup) {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById(idPopup).style.display = 'none';
}

function verHerramienta(folio) {
  const registro = historialPrestamo.find(item => item.folio === folio);

  if (registro) {
      const listaHerramientas = document.getElementById('listaHerramientas');
      listaHerramientas.innerHTML = registro.nombreHerramienta.map((herramienta, index) => `
          <li>
              <input type="checkbox" id="herramienta-${registro.folio}-${index}">
              <label for="herramienta-${registro.folio}-${index}">${herramienta}</label>
          </li>
      `).join('');  // El método map() procesará cada herramienta y join() unirá todo en una sola cadena de texto
      abrirPopup('popupVer');  // Actualizado con el ID correcto del popup
  }
}

function editarPrestamoForm(folio) {
  const registro = historialPrestamo.find(item => item.folio === folio);

  if (registro) {
      document.getElementById("editId").value = registro.folio;
      document.getElementById("editFolio").value = registro.folio;
      document.getElementById("editNombreDelTrabajador").value = registro.nombreTrabajador; // CORRECCIÓN: cambio en el nombre del id
      document.getElementById("editNombreHerramienta").value = registro.nombreHerramienta; // CORRECCIÓN: cambio en el nombre del id
      document.getElementById("editFechaTransaccion").value = registro.fechaTransaccion; // CORRECCIÓN: cambio en el nombre del id
      document.getElementById("editFechaDevolucion").value = registro.fechaDevolucion; // CORRECCIÓN: cambio en el nombre del id
      document.getElementById("editQuienAutorizo").value = registro.quienAutorizo; // CORRECCIÓN: cambio en el nombre del id
      document.getElementById("editObservaciones").value = registro.observaciones;

      abrirPopup('popupEditar');
  }
}

// Puedes llamar a generarTablaHistorial() aquí para que se genere la tabla al cargar la página
generarTablaHistorial(historialPrestamo);
