

function generarTablaHistorial(data) {
  const elementos = obtenerElementos();
  const fragment = document.createDocumentFragment();

  data.forEach((item, index) => {
    const newRow = document.createElement('tr');
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

  elementos.tablaHistorial.innerHTML = "";
  elementos.tablaHistorial.appendChild(fragment);

  historialEPPrevio = JSON.parse(JSON.stringify(data)); // Punto 6: considera la necesidad de esta línea
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


function buscarEPP(texto) {
  if (!texto || typeof texto !== 'string' || texto.trim() === "") {
    generarTablaHistorial(historialEPP);
    return;
  }

  texto = texto.toLowerCase();
  const indicesEncontrados = new Set();

  texto.split(' ').forEach(palabra => {
    const indicesPalabra = indiceTexto[palabra] || [];
    indicesPalabra.forEach(indice => indicesEncontrados.add(indice));
  });

  const resultados = [...indicesEncontrados].map(indice => historialEPP[indice]);
  generarTablaHistorial(resultados);
}

function buscarPorCategoria() {
  const categoriaElement = obtenerElemento('categoria');
  if (!categoriaElement) return;

  const categoria = String(categoriaElement.value).toLowerCase();
  const resultados = historialEPP.filter(item => 
    categoria === "todos" || (item.nombre && item.nombre.toLowerCase() === categoria)
  );

  generarTablaHistorial(resultados);
}

function buscarPorFecha() {
  // Punto 4: Mejor manejo de fechas
  const fechaInicioElement = obtenerElemento('fechaInicio');
  const fechaFinElement = obtenerElemento('fechaFin');
  
  if (!fechaInicioElement || !fechaFinElement) return; // Punto 5: almacenamiento de resultados de consultas DOM

  const fechaInicio = fechaInicioElement.value ? new Date(fechaInicioElement.value) : null;
  const fechaFin = fechaFinElement.value ? new Date(fechaFinElement.value) : null;

  const resultados = historialEPP.filter(item => {
    const fechaItem = new Date(item.fechaRegistro);
    return (!fechaInicio || fechaItem >= fechaInicio) && (!fechaFin || fechaItem <= fechaFin);
  });
  generarTablaHistorial(resultados);
}