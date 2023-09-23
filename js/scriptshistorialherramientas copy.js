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
  elementosCache = {
    eliminarBusqueda: document.getElementById('eliminarBusqueda'),
    buscador: document.getElementById('buscador'),
    categoria: document.getElementById('categoria'), // Asegúrate de que esta línea está presente y es correcta
    // ... otros elementos
  };
}

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

function crearIndices() {
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

function crearFila(item) {
  const row = document.createElement('tr');

  const campos = [
    "id", "nombre", "marca", "ordenCompra", 
    "tamaño", "noSerie", "estado", "color", 
    "tipo", "fechaRegistro", "descripcion", "estatus"
  ];

  campos.forEach(campo => {
    const cell = document.createElement('td');
    cell.setAttribute('data-label', campo.charAt(0).toUpperCase() + campo.slice(1));
    cell.textContent = item[campo];
    row.appendChild(cell);
  });

  const acciones = document.createElement('td');
  acciones.setAttribute('data-label', 'Acciones');
  acciones.innerHTML = `
    <button class="accion-button" onclick="descargarQRHerramienta('${item.id}')">Descargar QR</button>
    <button class="accion-button" onclick="editarHerramienta('${item.id}')">Editar</button>
    <button class="accion-button" onclick="eliminarHerramienta('${item.id}')">Eliminar</button>
  `;
  row.appendChild(acciones);

  return row;
}

function generarTablaHistorial(data) {
  const elementos = obtenerElementos();
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const newRow = crearFila(item);
    fragment.appendChild(newRow);
  });

  elementos.tablaHistorial.innerHTML = "";
  elementos.tablaHistorial.appendChild(fragment);

  historialAlmacenPrevio = [...data];
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

function abrirPopup(id) {
  obtenerElemento('overlay').style.display = 'block';
  obtenerElemento('popup').style.display = 'block';
}

function cerrarPopup() {
  obtenerElemento('overlay').style.display = 'none';
  obtenerElemento('popup').style.display = 'none';
}




