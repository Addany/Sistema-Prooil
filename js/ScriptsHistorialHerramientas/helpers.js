function verificarNIP(nip) {
  return nip === "1234"; 
}

function getDatosEdicion() {
  const elementos = obtenerElementos();
  return {
    nombre: elementos.editNombre.value,
    marca: elementos.editMarca.value,
    ordenCompra: elementos.editOrdenCompra.value,
    tamaño: elementos.editTamano.value,
    noSerie: elementos.editNoSerie.value,
    estado: elementos.editEstado.value,
    color: elementos.editColor.value,
    tipo: elementos.editTipo.value,
    fechaRegistro: elementos.editFecha.value,
    descripcion: elementos.editDescripcion.value,
    estatus: elementos.editEstatus.value
  };
}

function manejarFormularioEdicion() {
  const elementos = obtenerElementos();
  
  let id = elementos.editId.value;
  let datosEdicion = getDatosEdicion();
  
  if (validarFormulario(datosEdicion)) {
    guardarEdicion(id, datosEdicion);
    cerrarPopup(elementos.overlay, elementos.popup);
  }
}

function guardarEdicion(id, datosEdicion) {
  const index = indiceAlmacen.get(Number(id));
  if (index !== undefined) {
    historialAlmacen[index] = { ...historialAlmacen[index], ...datosEdicion };
    generarTablaHistorial(historialAlmacen);
    crearIndices(); 
  } else {
    console.error(`Herramienta con ID ${id} no encontrada.`);
  }
}

function validarCampo(campo, mensaje) {
  if (!campo || campo.trim() === '') {
    alert(mensaje);
    return false;
  }
  return true;
}

function validarFormulario(formulario) {
  return validarCampo(formulario.nombre, 'El nombre no puede estar vacío.') &&
         validarCampo(formulario.marca, 'La marca no puede estar vacía.');
}





