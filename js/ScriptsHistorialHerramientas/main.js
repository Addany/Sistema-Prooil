document.addEventListener('DOMContentLoaded', inicializar);

function verificarNIP(nip) {
  return nip === "1234"; 
}

function crearIndices() {
  console.time("miFuncion");
  historialAlmacen.forEach((item, index) => {
    indiceAlmacen.set(item.id, index);

    Object.values(item).forEach(valor => {
      const palabras = valor.toString().toLowerCase().split(' ');
      palabras.forEach(palabra => {
        if (!indiceTexto[palabra]) {
          indiceTexto[palabra] = [];
        }
        indiceTexto[palabra].push(index);
      });
    });
  });
  console.timeEnd("miFuncion");
}

function asignarEventos() {
  const eliminarBusquedaElement = obtenerElemento('eliminarBusqueda');
  const buscadorElement = obtenerElemento('buscador');
  const categoriaElement = obtenerElemento('categoria');
  const fechaInicioElement = obtenerElemento('fechaInicio');
  const fechaFinElement = obtenerElemento('fechaFin');
  const popupElement = obtenerElemento('popup');
  const cancelarEdicionElement = obtenerElemento('cancelarEdicion');
  const editarHerramientaFormElement = obtenerElemento('editarHerramientaForm');

  if (eliminarBusquedaElement) {
    eliminarBusquedaElement.addEventListener('click', eliminarBusqueda);
  }


  if (buscadorElement) {
    buscadorElement.oninput = () => buscarHerramienta(buscadorElement.value);
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

  if (editarHerramientaFormElement) {
    editarHerramientaFormElement.addEventListener("submit", event => {
      event.preventDefault();
      manejarFormularioEdicion();
    });
  }
}

function editarHerramienta(id) {
  const nip = prompt('Introduce el NIP:');
  if (verificarNIP(nip)) {
    const herramientaIndex = indiceAlmacen.get(Number(id)); // Convertir id a Number antes de buscar en el índice
    if (herramientaIndex !== undefined) {
      const herramienta = historialAlmacen[herramientaIndex];
      setFormValues(herramienta);
      abrirPopup();
    } else {
      console.error(`Herramienta con ID ${id} no encontrada.`);
    }
  } else {
    alert('NIP incorrecto.');
  }
}

function setFormValues(herramienta) {
  const elementos = obtenerElementos(); 

  elementos.editId.value = herramienta.id;
  elementos.editFoto.src = herramienta.foto || '';
  elementos.editTipoherramienta.value = herramienta.tipoherramienta;
  elementos.editMarca.value = herramienta.marca;
  elementos.editTamano.value = herramienta.tamaño;
  elementos.editOrdenCompra.value = herramienta.ordenCompra;
  elementos.editNoSerie.value = herramienta.noSerie;
  elementos.editEstado.value = herramienta.estado;
  elementos.editColor.value = herramienta.color;
  elementos.editFecha.value = herramienta.fechaRegistro;
  elementos.editDescripcion.value = herramienta.descripcion;
  elementos.editEstatus.value = herramienta.estatus;
}

