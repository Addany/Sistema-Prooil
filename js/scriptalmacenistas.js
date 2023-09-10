const almacenistas = [
  {
    estado: "Alta",
    id: "001324",
    nombre: "Adriancito Bonito",
    telefono: "+52 921 172 2326",
    correo: "juanperez@mail.com",
    fechaIngreso: "2023-07-03",
  },
  {
    estado: "Alta",
    id: "001324",
    nombre: "Juan Perez Hernandez",
    telefono: "+52 921 172 2329",
    correo: "juanperez@mail.com",
    fechaIngreso: "2023-07-03",
  },
  {
    estado: "Baja",
    id: "001324",
    nombre: "Maria Fernanda Cuchis Laurreta",
    telefono: "+52 921 172 2327",
    correo: "juanperez@mail.com",
    fechaIngreso: "2023-07-03",
  },

];

const elementos = {
  tabla: document.getElementById('tabla-almacenistas').getElementsByTagName('tbody')[0],
  buscador: document.getElementById('buscador'),
  fecha: document.getElementById('fecha'),
  fechaInicio: document.getElementById('fechaInicio'),
  fechaFin: document.getElementById('fechaFin'),
  categoria: document.getElementById('categoria'),
  editEstado: document.getElementById('editEstado'),
  editID: document.getElementById('editID'),
  editNombre: document.getElementById('editNombre'),
  editTelefono: document.getElementById('editTelefono'),
  editCorreo: document.getElementById('editCorreo'),
  editFechaIngreso: document.getElementById('editFechaIngreso'),
  overlay: document.getElementById('overlay'),
  popupEditar: document.getElementById('popupEditar'),
};

function generarTablaAlmacenistas(data) {
  let contenidoTabla = '';
  data.forEach(item => {
    contenidoTabla += `
      <tr>
        <td data-label="Estado">${item.estado}</td>
        <td data-label="ID">${item.id}</td>
        <td data-label="Nombre">${item.nombre}</td>
        <td data-label="Teléfono">${item.telefono}</td>
        <td data-label="Correo">${item.correo}</td>
        <td data-label="Fecha de Ingreso">${item.fechaIngreso}</td>
        <td data-label="Acciones"><button class="accion-button" onclick="editarAlmacenistaForm('${item.id}')">Editar</button></td>
      </tr>`;
  });
  elementos.tabla.innerHTML = contenidoTabla;
}

function editarAlmacenistaForm(id) {
  const almacenista = almacenistas.find(item => item.id === id);
  if (almacenista) {
    const nip = prompt('Por favor ingresa el NIP para editar:');
    if (nip === '1234') { // Reemplaza '1234' con tu NIP real
      const {
        editEstado, editID, 
        editNombre, editTelefono,
        editCorreo, editFechaIngreso 
      } = elementos;

      editEstado.value = almacenista.estado;
      editID.value = almacenista.id;
      editNombre.value = almacenista.nombre;
      editTelefono.value = almacenista.telefono;
      editCorreo.value = almacenista.correo;
      editFechaIngreso.value = almacenista.fechaIngreso;

      abrirPopup('popupEditar');
    } else {
      alert('NIP incorrecto, no puedes editar.');
    }
  }
}

document.getElementById('editarAlmacenistaForm').addEventListener('submit', function(event) {
  event.preventDefault();
  guardarEdicion();
});

function guardarEdicion() {
  if (!validarFormulario()) {
    return;
  }

  const almacenistaEditado = almacenistas.find(almacenista => almacenista.id === elementos.editID.value);

  if (almacenistaEditado) {
    almacenistaEditado.estado = elementos.editEstado.value;
    almacenistaEditado.nombre = elementos.editNombre.value;
    almacenistaEditado.telefono = elementos.editTelefono.value;
    almacenistaEditado.correo = elementos.editCorreo.value;
    almacenistaEditado.fechaIngreso = elementos.editFechaIngreso.value;

    generarTablaAlmacenistas(almacenistas);
    cerrarPopup('popupEditar');
  }
}

function validarFormulario() {
  const { editCorreo, editNombre, editTelefono } = elementos;

  if (!editCorreo.value.includes('@')) {
    alert('Por favor, introduce un correo electrónico válido');
    return false;
  }
  if (!editNombre.value) {
    alert('El nombre no puede estar vacío');
    return false;
  }
  if (!editTelefono.value.match(/^\+?\d+/)) {
    alert('Por favor, introduce un número de teléfono válido');
    return false;
  }

  return true;
}

function resetearBusqueda() {
  elementos.buscador.value = '';
  elementos.fechaInicio.value = '';
  elementos.fechaFin.value = '';
  elementos.categoria.value = 'todos';

  generarTablaAlmacenistas(almacenistas);
}

function abrirPopup(id) {
  elementos[id].style.display = 'block';
  elementos.overlay.style.display = 'block';
}

function cerrarPopup(id) {
  elementos[id].style.display = 'none';
  elementos.overlay.style.display = 'none';
}

let indiceAlmacenistas = {};

function crearIndice() {
  almacenistas.forEach((almacenista, index) => {
    const valores = [
      almacenista.id,
      almacenista.nombre,
      almacenista.telefono,
      almacenista.correo,
    ];

    valores.forEach(valor => {
      if(valor) {
        const claves = valor.toString().toLowerCase().split(' ');
        claves.forEach(clave => {
          if (!indiceAlmacenistas[clave]) {
            indiceAlmacenistas[clave] = [];
          }
          if (!indiceAlmacenistas[clave].includes(index)) {
            indiceAlmacenistas[clave].push(index);
          }
        });
      }
    });
  });
}
function buscar() {
  const texto = elementos.buscador.value.toLowerCase();
  const categoriaVal = elementos.categoria.value.toLowerCase();

  let resultados = new Set();

  if (texto) {
    const palabrasClave = texto.split(' ');
    palabrasClave.forEach(palabra => {
      if (indiceAlmacenistas[palabra]) {
        indiceAlmacenistas[palabra].forEach(index => resultados.add(almacenistas[index]));
      }
    });
  } else {
    almacenistas.forEach(almacenista => resultados.add(almacenista));
  }

  let fechaInicioVal = elementos.fechaInicio.value;
  let fechaFinVal = elementos.fechaFin.value;

  resultados = Array.from(resultados).filter(almacenista => {
    let fechaAlmacenista = new Date(almacenista.fechaIngreso);
    let coincideFecha = true;

    if (fechaInicioVal) {
      let fechaInicio = new Date(fechaInicioVal);
      coincideFecha = coincideFecha && (fechaAlmacenista >= fechaInicio);
    }

    if (fechaFinVal) {
      let fechaFin = new Date(fechaFinVal);
      coincideFecha = coincideFecha && (fechaAlmacenista <= fechaFin);
    }

    const coincideCategoria = categoriaVal === "todos" || (almacenista.estado.toLowerCase() === categoriaVal);

    return coincideFecha && coincideCategoria;
  });

  generarTablaAlmacenistas(resultados);
}

elementos.buscador.addEventListener('input', buscar);
elementos.fechaInicio.addEventListener('input', buscar);
elementos.fechaFin.addEventListener('input', buscar);
elementos.categoria.addEventListener('input', buscar);

crearIndice();
generarTablaAlmacenistas(almacenistas);