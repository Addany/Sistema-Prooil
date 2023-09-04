historialAlmacen = [
  {
    id: 12345,
    nombre: "Destornillador",
    marca: "MarcaX",
    ordenCompra: "12345",
    tamaño: "5mm",
    noSerie: "ABC123",
    estado: "Nuevo",
    color: "Rojo",
    tipo: "Herramienta Manual",
    fechaRegistro: "2023-08-01",
    descripcion: "Destornillador plano",
    estatus: "Prestado",
  },
  {
    id: 1123123123125,
    nombre: "Des123123",
    marca: "M123123asd",
    ordenCompra: "12131232145",
    tamaño: "5mm",
    noSerie: "A123123213123",
    estado: "N123123vo",
    color: "Rojo",
    tipo: "Herramienta Manual2",
    fechaRegistro: "2023-08-01",
    descripcion: "Destornillador plano",
    estatus: "Devuelto",
  }


  // ... más datos
];

document.addEventListener('DOMContentLoaded', (event) => {
  generarTablaHistorial(historialAlmacen);

  const buscador = document.getElementById('buscador');
  buscador.oninput = () => buscarHerramienta(buscador.value);

  const categoriaSelect = document.getElementById('categoria');
  categoriaSelect.onchange = () => buscarPorCategoria(categoriaSelect.value);

  const fechaInput = document.getElementById('fecha');
  fechaInput.onchange = () => buscarPorFecha(fechaInput.value);

  // Inicializar el popup
  var popup = document.getElementById("popup");
  popup.style.display = "none";

  document.getElementById("cancelarEdicion").addEventListener("click", function(event){
    event.preventDefault();
    popup.style.display = "none";
    cerrarPopup();
  });

  document.getElementById("editarHerramientaForm").addEventListener("submit", function(event){
    event.preventDefault();
    var id = document.getElementById("editId").value;
    var herramienta = historialAlmacen.find(item => item.id == id);
    herramienta.nombre = document.getElementById("editNombre").value;
    herramienta.marca = document.getElementById("editMarca").value;
    herramienta.tamaño = document.getElementById("editTamano").value;
    herramienta.ordenCompra = document.getElementById("editOrdenCompra").value;
    herramienta.noSerie = document.getElementById("editSerie").value;
    herramienta.estado = document.getElementById("editEstado").value;
    herramienta.color = document.getElementById("editColor").value;
    herramienta.tipo = document.getElementById("editTipo").value;
    herramienta.fechaRegistro = document.getElementById("editFecha").value;
    herramienta.descripcion = document.getElementById("editDescripcion").value;
    herramienta.estatus = document.getElementById("editEstatus").value;
    generarTablaHistorial(historialAlmacen);
    popup.style.display = "none";
    cerrarPopup();
  });
});

function editarHerramienta(id) {
  var herramienta = historialAlmacen.find(item => item.id == id);
  document.getElementById("editId").value = herramienta.id;
  document.getElementById("editNombre").value = herramienta.nombre;
  document.getElementById("editMarca").value = herramienta.marca;
  document.getElementById("editTamano").value = herramienta.tamaño;
  document.getElementById("editOrdenCompra").value = herramienta.ordenCompra;
  document.getElementById("editSerie").value = herramienta.noSerie;
  document.getElementById("editEstado").value = herramienta.estado;
  document.getElementById("editColor").value = herramienta.color;
  document.getElementById("editTipo").value = herramienta.tipo;
  document.getElementById("editFecha").value = herramienta.fechaRegistro;
  document.getElementById("editDescripcion").value = herramienta.descripcion;
  document.getElementById("editEstatus").value = herramienta.estatus;
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  abrirPopup();
}

function generarTablaHistorial(data) {
  const tabla = document.getElementById('tabla-historial').getElementsByTagName('tbody')[0];
  tabla.innerHTML = "";
  data.forEach(item => {
    const newRow = tabla.insertRow();
    newRow.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nombre}</td>
      <td>${item.marca}</td>
      <td>${item.ordenCompra}</td>
      <td>${item.tamaño}</td>
      <td>${item.noSerie}</td>
      <td>${item.estado}</td>
      <td>${item.color}</td>
      <td>${item.tipo}</td>
      <td>${item.fechaRegistro}</td>
      <td>${item.descripcion}</td>
      <td>${item.estatus}</td>
      <td>
        <button class="accion-button"onclick="editarHerramienta(${item.id})">Editar</button>
        <button class="accion-button"onclick="DescargarQR(${item.id})">DescargarQR</button>
        <button class="accion-button" onclick="eliminarHerramienta(${item.id})">Elimina</button>
      </td>
      
    `;
  });
}

function buscarHerramienta(texto) {
  const resultados = historialAlmacen.filter(item => 
    item.id == texto || 
    item.nombre.toLowerCase().includes(texto.toLowerCase()) ||
    item.marca.toLowerCase().includes(texto.toLowerCase())||
    item.ordenCompra.toLowerCase().includes(texto.toLowerCase()) ||
    item.tamaño.toLowerCase().includes(texto.toLowerCase()) ||
    item.estado.toLowerCase().includes(texto.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(texto.toLowerCase()) ||
    item.color.toLowerCase().includes(texto.toLowerCase()) ||
    item.noSerie.toLowerCase().includes(texto.toLowerCase())
  );
  generarTablaHistorial(resultados);
}


function buscarPorCategoria(categoria) {
  const resultados = historialAlmacen.filter(item => 
    categoria == "todos" || item.tipo == categoria
  );
  generarTablaHistorial(resultados);
}

function buscarPorFecha(fecha) {
  const resultados = historialAlmacen.filter(item => 
    item.fechaRegistro == fecha
  );
  generarTablaHistorial(resultados);
}

function abrirPopup() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';
}

function cerrarPopup() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
}

function eliminarHerramienta(id) {
  const index = historialAlmacen.findIndex(item => item.id === id);
  if (index !== -1) {
    historialAlmacen.splice(index, 1); // Elimina el elemento del array.
    generarTablaHistorial(historialAlmacen); // Actualiza la tabla.
  } else {
    console.error(`Herramienta con ID ${id} no encontrada.`);
  }
}
