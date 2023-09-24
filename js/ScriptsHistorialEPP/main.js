document.addEventListener('DOMContentLoaded', inicializar);


function crearIndices() {
  historialEPP.forEach((item, index) => {
    indiceEPP.set(item.id, index);

    Object.entries(item).forEach(([key, valor]) => {
      if (key !== 'nombre') {
        const palabras = valor.toString().toLowerCase().split(' ');
        palabras.forEach(palabra => {
          if (!indiceTexto[palabra]) {
            indiceTexto[palabra] = [];
          }
          indiceTexto[palabra].push(index);
        });
      }
    });
  });
}

function asignarEventos() {
  const eliminarBusquedaElement = obtenerElemento('eliminarBusqueda');
  const buscadorElement = obtenerElemento('buscador');
  const categoriaElement = obtenerElemento('categoria');
  const fechaInicioElement = obtenerElemento('fechaInicio');
  const fechaFinElement = obtenerElemento('fechaFin');
  const popupElement = obtenerElemento('popup');
  const cancelarEdicionElement = obtenerElemento('cancelarEdicion');
  const editarEPPFormElement = obtenerElemento('editarEPPForm');

  if (eliminarBusquedaElement) {
    eliminarBusquedaElement.addEventListener('click', eliminarBusqueda);
  }


  if (buscadorElement) {
    buscadorElement.oninput = () => buscarEPP(buscadorElement.value);
  } else {
    console.error('Elemento con ID "buscador" no encontrado');
  }

  if (categoriaElement) {
    categoriaElement.onchange = buscarPorCategoria;
  }

  if (fechaInicioElement) {
    fechaInicioElement.onchange = buscarPorFecha;
  }

  if (fechaFinElement) {
    fechaFinElement.onchange = buscarPorFecha;
  }

  if (popupElement) {
    popupElement.style.display = "none";
  }

  if (cancelarEdicionElement) {
    cancelarEdicionElement.addEventListener("click", event => {
      event.preventDefault();
      cerrarPopup();
    });
  }

  if (editarEPPFormElement) {
    editarEPPFormElement.addEventListener("submit", event => {
      event.preventDefault();
      manejarFormularioEdicion();
    });
  }
}

function editarEPP(id) {
  const nip = prompt('Introduce el NIP:');
  if (verificarNIP(nip)) {
    const EPPIndex = indiceEPP.get(Number(id)); // Convertir id a Number antes de buscar en el índice
    if (EPPIndex !== undefined) {
      const EPP = historialEPP[EPPIndex];
      setFormValues(EPP);
      abrirPopup();
    } else {
      console.error(`EPP con ID ${id} no encontrada.`);
    }
  } else {
    alert('NIP incorrecto.');
  }
}

function setFormValues(EPP) {
  const elementos = obtenerElementos(); 

  elementos.editId.value = EPP.id || '';
  elementos.editFoto.src = EPP.foto || '';
  elementos.editNombre.value = EPP.nombre || '';
  elementos.editCantidad.value = EPP.cantidad || '';
  elementos.editMarca.value = EPP.marca || '';
  elementos.editModelo.value = EPP.modelo || '';
  elementos.editTipo.value = EPP.tipo || '';
  elementos.editClase.value = EPP.clase || '';
  elementos.editTalla.value = EPP.talla || '';
  elementos.editOrdenCompra.value = EPP.ordenCompra || '';
  elementos.editFechaRegistro.value = EPP.fechaRegistro || ''; 
}

