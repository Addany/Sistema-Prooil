document.addEventListener('DOMContentLoaded', inicializar);
let historialAlmacenPrevio = [
  {
    foto:"Resources/imagen1.jpg",
    id: 12,
    tipoherramienta: "Destornillador",
    marca: "MarcaX",
    ordenCompra: "12",
    tamaño: "5mm",
    noSerie: "ABC123",
    estado: "Nuevo",
    color: "Verde",
    fechaRegistro: "2023-08-05",
    descripcion: "Plano",
    estatus: "Prestado",
  },
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
  'editFoto',
  'editId',
  'editMarca',
  'editOrdenCompra',
  'editTamano',
  'editNoSerie',
  'editEstado',
  'editColor',
  'editTipoherramienta',
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
  };
}
