// Datos de ejemplo para el historial del almacén
const historialAlmacen = [
  {
    id: 1,
    nombre: 'Martillo',
    color: 'Rojo',
    tipo: 'Herramienta Manual',
    fechaRegistro: '2023-07-20',
    descripcion: 'Martillo de acero con mango de madera',
    codigoQR: 'ABC123',
    imagen: 'martillo.jpg'
  },
  {
    id: 2,
    nombre: 'Taladro Inalámbrico',
    color: 'Negro y Amarillo',
    tipo: 'Eléctrica',
    fechaRegistro: '2023-07-22',
    descripcion: 'Taladro inalámbrico de 18V con accesorios',
    codigoQR: 'XYZ789',
    imagen: 'taladro.jpg'
  }
  // Agrega más datos aquí
];

// Función para buscar herramientas por texto o ID
function buscarHerramienta(texto) {
  const textoBuscado = texto.trim().toLowerCase();
  const historialFiltrado = historialAlmacen.filter(item => {
    return (
      item.id.toString().includes(textoBuscado) ||
      item.nombre.toLowerCase().includes(textoBuscado) ||
      item.color.toLowerCase().includes(textoBuscado) ||
      item.tipo.toLowerCase().includes(textoBuscado) ||
      item.descripcion.toLowerCase().includes(textoBuscado)
    );
  });
  generarFichasHistorial(historialFiltrado);
}

// Función para buscar herramientas por categoría
function buscarPorCategoria(categoria) {
  const historialFiltrado = historialAlmacen.filter(item => {
    return categoria === 'todos' || item.tipo === categoria;
  });
  generarFichasHistorial(historialFiltrado);
}

// Función para buscar herramientas por fecha
function buscarPorFecha(fecha) {
  const historialFiltrado = historialAlmacen.filter(item => item.fechaRegistro === fecha);
  generarFichasHistorial(historialFiltrado);
}

// Función para generar las fichas del historial del almacén
function generarFichasHistorial(historial) {
  const historyCards = document.querySelector('.history-cards');
  historyCards.innerHTML = '';

  historial.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `Resources/${item.imagen}`;
    img.alt = item.nombre;
    card.appendChild(img);

    const id = document.createElement('p');
    id.textContent = `ID: ${item.id}`;
    card.appendChild(id);

    const nombre = document.createElement('p');
    nombre.textContent = `Nombre: ${item.nombre}`;
    card.appendChild(nombre);

    const color = document.createElement('p');
    color.textContent = `Color: ${item.color}`;
    card.appendChild(color);

    const tipo = document.createElement('p');
    tipo.textContent = `Tipo: ${item.tipo}`;
    card.appendChild(tipo);

    const fechaRegistro = document.createElement('p');
    fechaRegistro.textContent = `Fecha de Registro: ${item.fechaRegistro}`;
    card.appendChild(fechaRegistro);

    const descripcion = document.createElement('p');
    descripcion.textContent = `Descripción: ${item.descripcion}`;
    card.appendChild(descripcion);

    const action = document.createElement('div');
    action.classList.add('action');

    const qrButton = document.createElement('button');
    qrButton.textContent = 'Descargar Código QR';
    qrButton.onclick = () => {
      // Aquí puedes agregar la lógica para descargar el código QR de la herramienta
      alert(`Descargando Código QR de ${item.nombre}`);
    };
    action.appendChild(qrButton);


    card.appendChild(action);

    historyCards.appendChild(card);
  });
}

// Llamamos a la función para generar las fichas del historial del almacén cuando la página se carga
window.addEventListener('DOMContentLoaded', () => {
  generarFichasHistorial(historialAlmacen);

  // Obtener elementos del formulario de búsqueda
  const formBuscar = document.querySelector('.form-buscar');
  const inputTexto = formBuscar.querySelector('#textoBuscar');
  const inputFecha = formBuscar.querySelector('#fechaBuscar');
  const selectCategoria = formBuscar.querySelector('#categoria');

  // Agregar evento de búsqueda por texto o ID
  formBuscar.addEventListener('submit', (event) => {
    event.preventDefault();
    const texto = inputTexto.value;
    buscarHerramienta(texto);
  });

  // Agregar evento de búsqueda por fecha
  inputFecha.addEventListener('change', () => {
    const fecha = inputFecha.value;
    buscarPorFecha(fecha);
  });

  // Agregar evento para filtrar por categoría
  selectCategoria.addEventListener('change', (event) => {
    const categoria = event.target.value;
    buscarPorCategoria(categoria);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  navToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
});

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, idx) => {
    if (idx === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}


