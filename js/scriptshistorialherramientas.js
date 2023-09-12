document.addEventListener('DOMContentLoaded', inicializar);
let historialAlmacenPrevio = [
  {
    id: 12345,
    nombre: "Destornillador",
    marca: "MarcaX",
    ordenCompra: "12345",
    tamaño: "5mm",
    noSerie: "ABC123",
    estado: "Nuevo",
    color: "Verde",
    tipo: "Herramienta Manual",
    fechaRegistro: "2023-08-05",
    descripcion: "Plano",
    estatus: "Prestado",
  },
  {
    id: 1123123123125,
    nombre: "Taladrox",
    marca: "asd",
    ordenCompra: "12131232145",
    tamaño: "8mm",
    noSerie: "A123123213123",
    estado: "N123123vo",
    color: "Rojo",
    tipo: "Herramienta Manual",
    fechaRegistro: "2023-08-01",
    descripcion: "Taladro feo",
    estatus: "Devuelto",
  }
];
const historialAlmacen = [...historialAlmacenPrevio];
const indiceAlmacen = new Map();
const indiceTexto = {};

const ELEMENT_IDS = [
  'buscador',
  'categoria',
  'fechaInicio',
  'fechaFin',
  'popup',
  'tabla-historial',
  'overlay',
  'editId',
  'editNombre',
  'editMarca',
  'editOrdenCompra',
  'editTamano',
  'editNoSerie',
  'editEstado',
  'editColor',
  'editTipo',
  'editFecha',
  'editDescripcion',
  'editEstatus',
];

let elementosCache = {};

function inicializarCache() {
  ELEMENT_IDS.forEach(id => {
    elementosCache[id] = document.getElementById(id);
  });

  // Inicializando la caché para tablaHistorialTBody aquí
  const tablaHistorialElement = elementosCache['tabla-historial'];
  if (tablaHistorialElement) {
    elementosCache['tablaHistorialTBody'] = tablaHistorialElement.getElementsByTagName('tbody')[0];
  } else {
    console.error('El elemento tabla-historial no se pudo encontrar');
    elementosCache['tablaHistorialTBody'] = null;
  }
}


function obtenerElemento(id) {
  // Primero intentamos obtener el elemento del caché
  if (elementosCache[id]) {
    return elementosCache[id];
  }
  
  // Si no está en el caché, lo buscamos en el DOM y lo añadimos al caché
  const elemento = document.getElementById(id);
  elementosCache[id] = elemento;
  return elemento;
}
function obtenerElementos() {
  return {
    buscador: elementosCache['buscador'],
    categoriaSelect: elementosCache['categoria'],
    fechaInicioInput: elementosCache['fechaInicio'],
    fechaFinInput: elementosCache['fechaFin'],
    popup: elementosCache['popup'],
    tablaHistorial: elementosCache['tablaHistorialTBody'], // Utilizando la caché aquí
    overlay: elementosCache['overlay'],
    editId: elementosCache['editId'],
    editNombre: elementosCache['editNombre'],
    editMarca: elementosCache['editMarca'],
    editOrdenCompra: elementosCache['editOrdenCompra'],
    editTamano: elementosCache['editTamano'],
    editNoSerie: elementosCache['editNoSerie'],
    editEstado: elementosCache['editEstado'],
    editColor: elementosCache['editColor'],
    editTipo: elementosCache['editTipo'],
    editFecha: elementosCache['editFecha'],
    editDescripcion: elementosCache['editDescripcion'],
    editEstatus: elementosCache['editEstatus'],
  };
}
function inicializar() {
  inicializarCache();
  asignarEventos();
  crearIndices();
  generarTablaHistorial(historialAlmacen);
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
    buscadorElement.oninput = buscar;
  }
  
  if (categoriaElement) {
    categoriaElement.onchange = buscar;
  }
  
  if (fechaInicioElement) {
    fechaInicioElement.onchange = buscar;
  }
  
  if (fechaFinElement) {
    fechaFinElement.onchange = buscar;
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

function crearIndices() {
  historialAlmacen.forEach((item, index) => {
    indiceAlmacen.set(item.id, index);

    Object.values(item).forEach(valor => {
      const palabras = valor.toString().toLowerCase().split(' ');
      palabras.forEach(palabra => {
        if (!indiceTexto[palabra]) {
          indiceTexto[palabra] = new Set();
        }
        indiceTexto[palabra].add(index);
      });
    });
  });
}

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

function eliminarBusqueda() {
  const confirmacion = confirm("¿Estás seguro de que quieres eliminar la búsqueda?");
  if(confirmacion) {
    // Resetear la tabla a su estado original
    generarTablaHistorial(historialAlmacenPrevio);
    
    // Inicializar la caché de elementos antes de utilizarla
    inicializarCache();
    
    // Restablecer los campos del formulario
    const elementos = obtenerElementos();  // Obtiene los elementos después de inicializar la caché
    elementos.buscador.value = '';
    elementos.categoriaSelect.value = 'todos';
    elementos.fechaInicioInput.value = '';
    elementos.fechaFinInput.value = '';
    
    // Recrear índices
    crearIndices();
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

function generarTablaHistorial(data) {
  const elementos = obtenerElementos();
  elementos.tablaHistorial.innerHTML = ""; // Limpiar el contenido anterior de la tabla
  
  const fragment = document.createDocumentFragment();

  data.forEach(item => {
      const row = document.createElement('tr');
      Object.keys(item).forEach(key => {
          const cell = document.createElement('td');
          cell.setAttribute('data-label', capitalizeFirstLetter(key));
          cell.textContent = item[key];
          row.appendChild(cell);
      });

      const actionCell = document.createElement('td');
      actionCell.setAttribute('data-label', "Acciones");
      actionCell.innerHTML = `
          <button class="accion-button" onclick="descargarQRHerramienta('${item.id}')">Descargar QR</button>
          <button class="accion-button" onclick="editarHerramienta('${item.id}')">Editar</button>
          <button class="accion-button" onclick="eliminarHerramienta('${item.id}')">Eliminar</button>
      `;
      row.appendChild(actionCell);

      fragment.appendChild(row);
  });

  elementos.tablaHistorial.appendChild(fragment);
  historialAlmacenPrevio = JSON.parse(JSON.stringify(data));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function buscar() {
  let resultados = historialAlmacen;

  // Filtro de texto
  const texto = elementosCache['buscador'].value.toLowerCase();
  if (texto.trim() !== "") {
    const indicesEncontrados = new Set();
    texto.split(' ').forEach(palabra => {
      const indicesPalabra = indiceTexto[palabra] || [];
      indicesPalabra.forEach(indice => indicesEncontrados.add(indice));
    });
    resultados = [...indicesEncontrados].map(indice => historialAlmacen[indice]);
  }

  // Filtro de categoría
  const categoria = elementosCache['categoria'].value;
  resultados = resultados.filter(item => 
    categoria === "todos" || item.estatus.toLowerCase() === categoria.toLowerCase()
  );

  // Filtro de fecha
  const fechaInicio = elementosCache['fechaInicio'].value ? new Date(elementosCache['fechaInicio'].value) : null;
  const fechaFin = elementosCache['fechaFin'].value ? new Date(elementosCache['fechaFin'].value) : null;
  resultados = resultados.filter(item => {
    const fechaItem = new Date(item.fechaRegistro);
    return (!fechaInicio || fechaItem >= fechaInicio) && (!fechaFin || fechaItem <= fechaFin);
  });

  // Generar tabla final
  generarTablaHistorial(resultados);
}

function abrirPopup(id) {
  obtenerElemento('overlay').style.display = 'block';
  obtenerElemento('popup').style.display = 'block';
}

function cerrarPopup() {
  obtenerElemento('overlay').style.display = 'none';
  obtenerElemento('popup').style.display = 'none';
}




