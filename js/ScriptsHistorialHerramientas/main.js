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
  elementos.editNombre.value = herramienta.nombre;
  elementos.editMarca.value = herramienta.marca;
  elementos.editTamano.value = herramienta.tamaño;
  elementos.editOrdenCompra.value = herramienta.ordenCompra;
  elementos.editNoSerie.value = herramienta.noSerie;
  elementos.editEstado.value = herramienta.estado;
  elementos.editColor.value = herramienta.color;
  elementos.editTipo.value = herramienta.tipo;
  elementos.editFecha.value = herramienta.fechaRegistro;
  elementos.editDescripcion.value = herramienta.descripcion;
  elementos.editEstatus.value = herramienta.estatus;
}
function eliminarHerramienta(id) {
  const nip = prompt('Introduce el NIP:');
  if (verificarNIP(nip)) {
    const index = indiceAlmacen.get(id);
    if (index !== undefined) {
      historialAlmacen.splice(index, 1);
      indiceAlmacen.delete(id); // Eliminamos el ítem del índice
      generarTablaHistorial(historialAlmacen);
      crearIndices(); // Actualizamos el índice después de eliminar
    } else {
      console.error(`Herramienta con ID ${id} no encontrada.`);
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
      id: 101,
      nombre: "Producto1",
      marca: "MarcaA",
      ordenCompra: "001",
      tamaño: "5mm",
      noSerie: "SER001",
      estado: "Nuevo",
      color: "Azul",
      tipo: "TipoA",
      fechaRegistro: "2023-09-01",
      descripcion: "Descripción del producto 1",
      estatus: "Disponible",
    },
    {
      id: 102,
      nombre: "Producto2",
      marca: "MarcaB",
      ordenCompra: "002",
      tamaño: "10mm",
      noSerie: "SER002",
      estado: "Usado",
      color: "Rojo",
      tipo: "TipoB",
      fechaRegistro: "2023-09-02",
      descripcion: "Descripción del producto 2",
      estatus: "Prestado",
    },
  ];
}
