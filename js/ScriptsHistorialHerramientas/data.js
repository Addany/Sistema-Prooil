document.addEventListener('DOMContentLoaded', inicializar);
let historialAlmacenPrevio = [
  {
    id: 12,
    nombre: "Destornillador",
    marca: "MarcaX",
    ordenCompra: "12",
    tamaño: "5mm",
    noSerie: "ABC123",
    estado: "Nuevo",
    color: "Verde",
    tipo: "Tal",
    fechaRegistro: "2023-08-05",
    descripcion: "Plano",
    estatus: "Prestado",
  },
  {
    id: 1,
    nombre: "Taladrox",
    marca: "asd",
    ordenCompra: "12",
    tamaño: "8mm",
    noSerie: "A123123213123",
    estado: "N123123vo",
    color: "Rojo",
    tipo: "Tal",
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

function inicializar() {
  inicializarCache();
  asignarEventos();
  crearIndices();
  generarTablaHistorial(historialAlmacen);
}

let elementosCache = {};

function inicializarCache() {
  elementosCache = {
    eliminarBusqueda: document.getElementById('eliminarBusqueda'),
    buscador: document.getElementById('buscador'),
    categoria: document.getElementById('categoria'), // Asegúrate de que esta línea está presente y es correcta
    // ... otros elementos
  };
}
