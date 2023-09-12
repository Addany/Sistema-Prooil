function obtenerElemento(id) {
  return document.getElementById(id);
}

function obtenerElementos() {
  var tablaHistorialElement = obtenerElemento('tabla-historial');
  var tablaHistorialTBody = null;

  if (tablaHistorialElement) {
    tablaHistorialTBody = tablaHistorialElement.getElementsByTagName('tbody')[0];
  } else {
    console.error('El elemento tabla-historial no se pudo encontrar');
  }

  return {
    buscador: obtenerElemento('buscador'),
    categoriaSelect: obtenerElemento('categoria'),
    fechaInicioInput: obtenerElemento('fechaInicio'),
    fechaFinInput: obtenerElemento('fechaFin'),
    popup: obtenerElemento('popup'),
    tablaHistorial: tablaHistorialTBody,
    overlay: obtenerElemento('overlay'),
    editId: obtenerElemento('editId'),
    editNombre: obtenerElemento('editNombre'),
    editMarca: obtenerElemento('editMarca'),
    editOrdenCompra: obtenerElemento('editOrdenCompra'),
    editTamano: obtenerElemento('editTamano'),
    editNoSerie: obtenerElemento('editNoSerie'),
    editEstado: obtenerElemento('editEstado'),
    editColor: obtenerElemento('editColor'),
    editTipo: obtenerElemento('editTipo'),
    editFecha: obtenerElemento('editFecha'),
    editDescripcion: obtenerElemento('editDescripcion'),
    editEstatus: obtenerElemento('editEstatus'),
  };
}

