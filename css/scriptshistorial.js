const historialPrestamosDevoluciones = [
  {
    id: 1,
    tipo: 'Préstamo',
    trabajador: 'Carlos Gómez',
    herramienta: 'Sierra Circular',
    tipoHerramienta: 'Eléctrica',
    codigoQR: 'XYZ789',
    fecha: '2023-07-20',
    imagen: 'sierra_circular.jpg'
  },
  {
    id: 2,
    tipo: 'Devolución',
    trabajador: 'Luis Ramírez',
    herramienta: 'Taladro',
    idHerramienta: 'TLD001',
    fecha: '2023-07-25',
    imagen: 'taladro.jpg'
  },
  // Agregar más datos aquí
];

function generarFichasHistorial(historial) {
  const historyCards = document.querySelector('.history-cards');
  historyCards.innerHTML = '';

  historial.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `img/${item.imagen}`;
    img.alt = item.herramienta;
    card.appendChild(img);

    const tipo = document.createElement('p');
    tipo.textContent = item.tipo;
    card.appendChild(tipo);

    const trabajador = document.createElement('p');
    trabajador.textContent = `Nombre del Trabajador: ${item.trabajador}`;
    card.appendChild(trabajador);

    if (item.tipo === 'Préstamo') {
      const tipoHerramienta = document.createElement('p');
      tipoHerramienta.textContent = `Tipo de Herramienta: ${item.tipoHerramienta}`;
      card.appendChild(tipoHerramienta);

      const codigoQR = document.createElement('p');
      codigoQR.textContent = `Código QR de la Herramienta: ${item.codigoQR}`;
      card.appendChild(codigoQR);
    } else if (item.tipo === 'Devolución') {
      const idHerramienta = document.createElement('p');
      idHerramienta.textContent = `ID de la Herramienta: ${item.idHerramienta}`;
      card.appendChild(idHerramienta);
    }

    const fecha = document.createElement('p');
    fecha.classList.add('date');
    fecha.textContent = `Fecha: ${item.fecha}`;
    card.appendChild(fecha);

    const action = document.createElement('div');
    action.classList.add('action');

    const button = document.createElement('button');
    button.textContent = 'Ver Detalles';
    button.addEventListener('click', () => {
      // Aquí puedes agregar la lógica para mostrar más detalles del préstamo o devolución
      alert(`Detalles del ${item.tipo}: ${item.herramienta}`);
    });

    button.classList.add(item.tipo === 'Préstamo' ? 'loan' : 'return');
    action.appendChild(button);
    card.appendChild(action);

    historyCards.appendChild(card);
  });
}

function filtrarPorCategoria(categoria) {
  if (categoria === 'todos') {
    generarFichasHistorial(historialPrestamosDevoluciones);
  } else {
    const historialFiltrado = historialPrestamosDevoluciones.filter(item => item.tipo === categoria);
    generarFichasHistorial(historialFiltrado);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  generarFichasHistorial(historialPrestamosDevoluciones);

  // Obtener elementos del formulario de búsqueda
  const formBuscar = document.querySelector('.form-buscar');
  const inputTexto = formBuscar.querySelector('#textoBuscar');
  const inputFecha = formBuscar.querySelector('#fechaBuscar');

  // Agregar evento de búsqueda por texto
  formBuscar.addEventListener('submit', (event) => {
    event.preventDefault();
    const texto = inputTexto.value;
    buscarPorTexto(texto);
  });

  // Agregar evento de búsqueda por fecha
  inputFecha.addEventListener('change', () => {
    const fecha = inputFecha.value;
    buscarPorFecha(fecha);
  });

  // Obtener elemento del select de categoría
  const selectCategoria = document.getElementById('categoria');

  // Agregar evento para filtrar por categoría
  selectCategoria.addEventListener('change', (event) => {
    const categoria = event.target.value;
    filtrarPorCategoria(categoria);
  });
});

function buscarPorTexto(texto) {
  const historialFiltrado = historialPrestamosDevoluciones.filter(item => {
    return (
      item.trabajador.toLowerCase().includes(texto.toLowerCase()) ||
      item.herramienta.toLowerCase().includes(texto.toLowerCase()) ||
      (item.tipoHerramienta && item.tipoHerramienta.toLowerCase().includes(texto.toLowerCase())) ||
      (item.codigoQR && item.codigoQR.toLowerCase().includes(texto.toLowerCase())) ||
      (item.idHerramienta && item.idHerramienta.toLowerCase().includes(texto.toLowerCase()))
    );
  });

  generarFichasHistorial(historialFiltrado);
}

function buscarPorFecha(fecha) {
  const historialFiltrado = historialPrestamosDevoluciones.filter(item => item.fecha === fecha);
  generarFichasHistorial(historialFiltrado);
}
