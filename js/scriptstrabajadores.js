const trabajadores = [
  {
    id: "001",
    nombre: "Juan Perez",
    telefono: "555-1234",
    correo: "juanperez@mail.com",
    areaTrabajo: "Tecnología",
    fechaIngreso: "2023-08-03",
    foto: "ruta/de/foto.jpg"
  },
  {
    id: "002",
    nombre: "Pedro Gomez",
    telefono: "555-1235",
    correo: "pedrogomez@mail.com",
    areaTrabajo: "Tecnología",
    fechaIngreso: "2023-08-06",
    foto: "ruta/de/foto2.jpg"
  },
];

function generarTablaTrabajadores(data) {
  const tabla = document.getElementById('tabla-trabajadores').getElementsByTagName('tbody')[0];
  tabla.innerHTML = "";
  data.forEach(item => {
      const newRow = tabla.insertRow();
      newRow.innerHTML = `
          <td><img src="${item.foto}" alt="Foto de ${item.nombre}" class="foto-trabajador"></td>
          <td>${item.id}</td>
          <td>${item.nombre}</td>
          <td>${item.telefono}</td>
          <td>${item.correo}</td>
          <td>${item.areaTrabajo}</td>
          <td>${item.fechaIngreso}</td>
          <td>
              <button class="accion-button" onclick="editarTrabajadorForm('${item.id}')">Editar</button>
              <button class="accion-button" onclick="eliminarTrabajador('${item.id}')">Eliminar</button>
          </td>
      `;
  });
}

function editarTrabajadorForm(id) {
  const trabajador = trabajadores.find(item => item.id === id);
  if (trabajador) {
      document.getElementById("editFoto").src = trabajador.foto;
      document.getElementById("editID").value = trabajador.id;
      document.getElementById("editNombre").value = trabajador.nombre;
      document.getElementById("editTelefono").value = trabajador.telefono;
      document.getElementById("editCorreo").value = trabajador.correo;
      document.getElementById("editAreaTrabajo").value = trabajador.areaTrabajo;
      document.getElementById("editFechaIngreso").value = trabajador.fechaIngreso;

      abrirPopup('popupEditar');
  }
}

function actualizarFoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('editFoto').src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
}

function abrirPopup(id) {
  document.getElementById(id).style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function cerrarPopup(id) {
  document.getElementById(id).style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function buscar() {
  const texto = document.getElementById('buscador').value.toLowerCase();
  const fecha = document.getElementById('fecha').value;
  const categoria = document.getElementById('categoria').value; // Eliminado toLowerCase()

  console.log({ texto, fecha, categoria }); 

  const resultados = trabajadores.filter(trabajador => {
    const coincideTexto = texto ? 
      (trabajador.nombre.toLowerCase().includes(texto) || 
       trabajador.correo.toLowerCase().includes(texto)) : 
      true;

    const coincideFecha = fecha ? 
      (trabajador.fechaIngreso === fecha) : 
      true;

    const coincideCategoria = categoria !== "todos" ? 
      (trabajador.areaTrabajo === categoria) :  // Eliminado toLowerCase()
      true;

      console.log('Coincide categoría:', coincideCategoria);
      
  return coincideTexto && coincideFecha && coincideCategoria;
  });

  console.log({ resultados });

  generarTablaTrabajadores(resultados);
}

generarTablaTrabajadores(trabajadores);