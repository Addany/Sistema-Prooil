document.addEventListener('DOMContentLoaded', inicializar);


function crearIndices() {
  console.time("miFuncion");
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
function eliminarEPP(id) {
  const nip = prompt('Introduce el NIP:');
  if (verificarNIP(nip)) {
    const index = indiceEPP.get(id);
    if (index !== undefined) {
      historialEPP.splice(index, 1);
      indiceEPP.delete(id); // Eliminamos el ítem del índice
      generarTablaHistorial(historialEPP);
      crearIndices(); // Actualizamos el índice después de eliminar
    } else {
      console.error(`EPP con ID ${id} no encontrada.`);
    }
  } else {
    alert('NIP incorrecto.');
  }
}
function eliminarBusqueda() {
  console.log("Inicio de la función eliminarBusqueda");

  // Obtén el estado actual de la base de datos
  console.log("Obteniendo estado actual de la base de datos...");
  const datosActuales = obtenerDatosActuales();

  // Resetear la tabla con el estado actual de la base de datos
  console.log("Intentando resetear la tabla...");
  generarTablaHistorial(datosActuales);
  
  // Inicializar la caché de elementos antes de utilizarla
  console.log("Inicializando caché...");
  inicializarCache();
  
  // Restablecer los campos del formulario
  console.log("Obteniendo elementos...");
  const elementos = obtenerElementos();  // Obtiene los elementos después de inicializar la caché
  console.log("Elementos obtenidos:", elementos);
  
  console.log("Restableciendo valores del formulario...");
  elementos.buscador.value = '';
  elementos.categoriaSelect.value = 'todos';
  elementos.fechaInicioInput.value = '';
  elementos.fechaFinInput.value = '';
  
  // Recrear índices
  console.log("Recreando índices...");
  crearIndices();

  console.log("Fin de la función eliminarBusqueda");
}

function obtenerDatosActuales() {
  // Aquí deberás implementar la lógica para obtener los datos actuales de tu base de datos.
  // Por ahora, estoy devolviendo una lista de elementos de muestra.
  return [
    {
      foto:"foto.png",
      id: 12,
      nombre: "Destornillador",
      cantidad: "123",
      marca: "MarcaX",
      modelo: "Buenas",
      tipo: "Cabezal",
      clase: "Buenas",
      talla: "34",
      ordenCompra: "324234",
      fechaRegistro: "2023-08-05",
    },
    {
      foto:"foto.png",
      id: 12,
      nombre: "Destornillador",
      cantidad: "123",
      marca: "MarcaX",
      modelo: "Buenas",
      tipo: "Cabezal",
      clase: "Buenas",
      talla: "34",
      ordenCompra: "324234",
      fechaRegistro: "2023-08-05",
    },
  ];
}
