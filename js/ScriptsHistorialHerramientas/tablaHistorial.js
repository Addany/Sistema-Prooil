function generarTablaHistorial(data) {
  console.log('Data recibida en generarTablaHistorial:', JSON.stringify(data, null, 2));
  const elementos = obtenerElementos();
  const fragment = document.createDocumentFragment();

  data.forEach((item, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td data-label="ID">${item.id}</td>
      <td data-label="Nombre">${item.nombre}</td>
      <td data-label="Marca">${item.marca}</td>
      <td data-label="Orden de compra">${item.ordenCompra}</td>
      <td data-label="Tamaño">${item.tamaño}</td>
      <td data-label="No. Serie">${item.noSerie}</td>
      <td data-label="Estado">${item.estado}</td>
      <td data-label="Color">${item.color}</td>
      <td data-label="Tipo">${item.tipo}</td>
      <td data-label="Fecha de Registro">${item.fechaRegistro}</td>
      <td data-label="Descripción">${item.descripcion}</td>
      <td data-label="Estatus">${item.estatus}</td>
      <td data-label="Acciones">
          <button class="accion-button" onclick="descargarQRHerramienta('${item.id}')">Descargar QR</button>
          <button class="accion-button" onclick="editarHerramienta('${item.id}')">Editar</button>
          <button class="accion-button" onclick="eliminarHerramienta('${item.id}')">Eliminar</button>
      </td>
    `;
    fragment.appendChild(newRow);  // Esto es lo que faltaba.
  });

  elementos.tablaHistorial.innerHTML = "";
  elementos.tablaHistorial.appendChild(fragment);

  historialAlmacenPrevio = JSON.parse(JSON.stringify(data)); 
}


function buscarHerramienta(texto) {
  if (texto.trim() === "") {
    generarTablaHistorial(historialAlmacen);
    return;
  }

  texto = texto.toLowerCase();
  const indicesEncontrados = new Set();

  texto.split(' ').forEach(palabra => {
    const indicesPalabra = indiceTexto[palabra] || [];
    indicesPalabra.forEach(indice => indicesEncontrados.add(indice));
  });

  const resultados = [...indicesEncontrados].map(indice => historialAlmacen[indice]);
  generarTablaHistorial(resultados);
}

function buscarPorCategoria() {
  const categoria = obtenerElemento('categoria').value;
  const resultados = historialAlmacen.filter(item => 
    categoria === "todos" || item.estatus.toLowerCase() === categoria.toLowerCase()
  );
  generarTablaHistorial(resultados);
}

function buscarPorFecha() {
  const fechaInicio = obtenerElemento('fechaInicio').value ? new Date(obtenerElemento('fechaInicio').value) : null;
  const fechaFin = obtenerElemento('fechaFin').value ? new Date(obtenerElemento('fechaFin').value) : null;

  const resultados = historialAlmacen.filter(item => {
    const fechaItem = new Date(item.fechaRegistro);
    return (!fechaInicio || fechaItem >= fechaInicio) && (!fechaFin || fechaItem <= fechaFin);
  });
  generarTablaHistorial(resultados);
}