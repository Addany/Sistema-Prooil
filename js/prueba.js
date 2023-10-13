document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('buscador').addEventListener('input', buscar);
  document.getElementById('fechaInicio').addEventListener('change', buscar);
  document.getElementById('fechaFin').addEventListener('change', buscar);
  document.getElementById('categoria').addEventListener('change', buscar);
  document.getElementById('limpiarBusqueda').addEventListener('click', limpiarBusqueda);
});

function buscar() {
  const textoBuscar = document.getElementById('buscador').value.trim().toLowerCase();
  const fechaInicio = document.getElementById('fechaInicio').value ? new Date(document.getElementById('fechaInicio').value) : null;
  const fechaFin = document.getElementById('fechaFin').value ? new Date(document.getElementById('fechaFin').value) : null;
  const categoriaBuscar = document.getElementById('categoria').value;

  const tabla = document.getElementById('tabla-almacenistas');
  const filas = tabla.querySelectorAll('tbody tr');

  filas.forEach((fila, index) => {
      const celdas = {
          estado: fila.querySelector("td[data-label='Estado']"),
          usuario: fila.querySelector("td[data-label='Usuario']"),
          nombre: fila.querySelector("td[data-label='Nombre']"),
          telefono: fila.querySelector("td[data-label='Teléfono']"),
          correo: fila.querySelector("td[data-label='Correo']"),
          fechaIngreso: fila.querySelector("td[data-label='Fecha de Ingreso']"),
      };

      for (const [key, celda] of Object.entries(celdas)) {
          if (!celda) {
              console.error(`Fila ${index + 1} con ${key} faltante.`, fila);  // Mantengo este log para alertar de posibles errores
              return;
          }
      }
      
      const { estado, usuario, nombre, telefono, correo, fechaIngreso } = celdas;

      const coincideTexto = textoBuscar ? 
          [estado, usuario, nombre, telefono, correo].some(celda => celda.textContent.toLowerCase().includes(textoBuscar)) : 
          true;

      const coincideCategoria = categoriaBuscar !== 'todos' ? estado.textContent.toLowerCase() === categoriaBuscar.toLowerCase() : true;

      const fechaIngresoDate = new Date(fechaIngreso.textContent);
      const coincideFecha = (fechaInicio ? fechaIngresoDate >= fechaInicio : true) && (fechaFin ? fechaIngresoDate <= fechaFin : true);

      if (coincideTexto && coincideCategoria && coincideFecha) {
          fila.style.display = '';
      } else {
          fila.style.display = 'none';
      }
  });
}

function limpiarBusqueda() {
  document.getElementById('buscador').value = '';
  document.getElementById('fechaInicio').value = '';
  document.getElementById('fechaFin').value = '';
  document.getElementById('categoria').value = 'todos';
  buscar();
}