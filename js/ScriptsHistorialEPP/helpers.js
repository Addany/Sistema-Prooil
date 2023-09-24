function verificarNIP(nip) {
  return nip === "1234"; 
}

function getDatosEdicion() {
  const elementos = obtenerElementos();
  return {
    nombre: elementos.editNombre.value,
    marca: elementos.editMarca.value,
    ordenCompra: elementos.editOrdenCompra.value,
  };
}

function manejarFormularioEdicion() {
  const elementos = obtenerElementos();
  
  let id = elementos.editId.value;
  let datosEdicion = getDatosEdicion();
  
  if (validarFormulario(datosEdicion)) {
    guardarEdicion(id, datosEdicion);
    cerrarPopup(elementos.overlay, elementos.popup); // Punto 5: Asegúrate que cerrarPopup está definido en algún lugar.
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
  // Punto 1: Considera añadir validaciones para los otros campos que están en tu tabla.
  return validarCampo(formulario.nombre, 'El nombre no puede estar vacío.') &&
         validarCampo(formulario.marca, 'La marca no puede estar vacía.');
         // ...
         // Agrega validaciones para otros campos aquí.
}

