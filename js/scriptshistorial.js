const historialAlmacen = [
  {
      estatus: "Prestado",
      folio: "12345",
      nombreTrabajador: "Juan Perez",
      nombreHerramienta: "Destornillador",
      fechaTransaccion: "2023-08-01",
      fechaDevolucion: "2023-08-05",
      observaciones: "Ninguna",
  },
  {
      estatus: "Devuelto",
      folio: "67890",
      nombreTrabajador: "Maria Lopez",
      nombreHerramienta: "Taladro",
      fechaTransaccion: "2023-08-15",
      fechaDevolucion: "2023-08-20",
      observaciones: "Ligero desgaste",
  },
];

function generarTablaHistorial(data) {
  const tabla = document.getElementById('tabla-historial').getElementsByTagName('tbody')[0];
  tabla.innerHTML = "";
  data.forEach(item => {
      const newRow = tabla.insertRow();
      newRow.innerHTML = `
          <td>${item.estatus}</td>
          <td>${item.folio}</td>
          <td>${item.nombreTrabajador}</td>
          <td>${item.nombreHerramienta}</td>
          <td>${item.fechaTransaccion}</td>
          <td>${item.fechaDevolucion}</td>
          <td>${item.observaciones}</td>
          <td><button class="accion-button" onclick="editarHerramienta('${item.folio}')">Editar</button>
          <button class="accion-button" onclick="DescargarQR('${item.folio}')">DescargarQR</button>
          </td>
      `;
  });
}
function buscar() {
  const textoBuscar = document.getElementById('buscador').value.trim().toLowerCase();
  const fechaBuscar = document.getElementById('fecha').value;
  const categoriaBuscar = document.getElementById('categoria').value; // No convertir a minúsculas

  const resultados = historialAlmacen.filter(item => {
      const itemMinusculas = {
          folio: item.folio.trim().toLowerCase(),
          nombreTrabajador: item.nombreTrabajador.trim().toLowerCase(),
          nombreHerramienta: item.nombreHerramienta.trim().toLowerCase(),
          observaciones: item.observaciones.trim().toLowerCase(),
      };

      return (
          (textoBuscar ? 
              itemMinusculas.folio.includes(textoBuscar) ||
              itemMinusculas.nombreTrabajador.includes(textoBuscar) ||
              itemMinusculas.nombreHerramienta.includes(textoBuscar) ||
              itemMinusculas.observaciones.includes(textoBuscar) : true
          ) &&
          (fechaBuscar ? item.fechaTransaccion === fechaBuscar : true) &&
          (categoriaBuscar !== 'todos' ? item.estatus === categoriaBuscar : true)
      );
  });

  generarTablaHistorial(resultados);
}

// Inicializar la tabla con todos los datos al cargar la página
document.addEventListener('DOMContentLoaded', (event) => {
  generarTablaHistorial(historialAlmacen);
});

function editarHerramienta(folio) {
  // código para editar herramienta
}

function DescargarQR(folio) {
  // código para descargar QR
}