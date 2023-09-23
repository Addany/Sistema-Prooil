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
    editFoto: document.getElementById('editFoto'),
    buscador: obtenerElemento('buscador'),
    categoriaSelect: obtenerElemento('categoria'),
    fechaInicioInput: obtenerElemento('fechaInicio'),
    fechaFinInput: obtenerElemento('fechaFin'),
    popup: obtenerElemento('popup'),
    tablaHistorial: tablaHistorialTBody,
    overlay: obtenerElemento('overlay'),
    editFoto: obtenerElemento('editFoto'),  
    editId: obtenerElemento('editId'),
    editNombre: obtenerElemento('editNombre'),
    editCantidad: obtenerElemento('editCantidad'),  
    editMarca: obtenerElemento('editMarca'),
    editModelo: obtenerElemento('editModelo'),  
    editTipo: obtenerElemento('editTipo'), 
    editClase: obtenerElemento('editClase'), 
    editTalla: obtenerElemento('editTalla'),  
    editOrdenCompra: obtenerElemento('editOrdenCompra'),  
    editFechaRegistro: obtenerElemento('editFechaRegistro'),  
  };
}