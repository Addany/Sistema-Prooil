document.addEventListener('DOMContentLoaded', inicializar);
let historialEPPrevio = [
  {
    foto:"Resources/imagen1.jpg",
    id: 124,
    nombre: "Capucha",
    cantidad: "74",
    marca: "MarcaX",
    modelo: "Buenas",
    tipo: "Cabezal1",
    clase: "Buenas",
    talla: 16,
    ordenCompra: "324234",
    fechaRegistro: "2023-08-05",
  },
  {
    foto:"Resources/imagen1.jpg",
    id: 128,
    nombre: "Casco contra impacto",
    cantidad: "14345",
    marca: "MarcaX",
    modelo: "Buenas",
    tipo: "Cabezal2",
    clase: "Buenas",
    talla: "32",
    ordenCompra: "324234",
    fechaRegistro: "2023-08-05",
  },
  {
    foto:"Resources/imagen1.jpg",
    id: 122,
    nombre: "Casco contra impacto",
    cantidad: "158",
    marca: "MarcaX",
    modelo: "Buenastardesnoches",
    tipo: "Cabezal3",
    clase: "Buenas",
    talla: "35",
    ordenCompra: "324234",
    fechaRegistro: "2023-08-05",
  },
];
const historialEPP = [...historialEPPrevio];
const indiceEPP = new Map();
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
  'editNombre',
  'editCantidad',
  'editMarca',
  'editModelo',
  'editTipo',
  'editClase',
  'editTalla',
  'editFecha',
  'editOrdenCompra',
  'editfechaRegistro'
];

function inicializar() {
  inicializarCache();
  asignarEventos();
  crearIndices();
  generarTablaHistorial(historialEPP);
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
