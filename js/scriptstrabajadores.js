const trabajadores = [
  {
    foto: "Resources/imagen1.jpg",
    estado: "Alta",
    tipoRegistro:"Invitado",
    id: "001324",
    nombre: "Juan Perez",
    telefono: "+52 921 172 2326",
    correo: "juanperez@mail.com",
    areaTrabajo: "Almacen",
    fechaIngreso: "2023-07-03",
  },
  {
    foto: "Resources/imagen1.jpg",
    estado: "Alta",
    tipoRegistro:"Invitado",
    id: "001324",
    nombre: "Juan Perez",
    telefono: "+52 921 172 2326",
    correo: "juanperez@mail.com",
    areaTrabajo: "Almacen",
    fechaIngreso: "2023-08-03",
  },
  {
    foto: "Resources/imagen1.jpg",
    estado: "Baja",
    tipoRegistro:"Invitado",
    id: "001324",
    nombre: "Juan Perez",
    telefono: "+52 921 172 2326",
    correo: "juanperez@mail.com",
    areaTrabajo: "Almacen",
    fechaIngreso: "2023-08-03",
  },
  {
    foto: "Resources/imagen1.jpg",
    estado: "Alta",
    tipoRegistro:"Invitado",
    id: "001324",
    nombre: "Juan Perez",
    telefono: "+52 921 172 2326",
    correo: "juanperez@mail.com",
    areaTrabajo: "Almacen",
    fechaIngreso: "2023-09-03",
  },
];

const elementos = {
  tabla: document.getElementById('tabla-trabajadores').getElementsByTagName('tbody')[0],
  buscador: document.getElementById('buscador'),
  fecha: document.getElementById('fecha'),
  fechaInicio: document.getElementById('fechaInicio'),
  fechaFin: document.getElementById('fechaFin'),
  categoria: document.getElementById('categoria'),
  editFoto: document.getElementById('editFoto'),
  editEstado: document.getElementById('editEstado'),
  editTipoRegistro: document.getElementById('editTipoRegistro'),
  editID: document.getElementById('editID'),
  editNombre: document.getElementById('editNombre'),
  editTelefono: document.getElementById('editTelefono'),
  editCorreo: document.getElementById('editCorreo'),
  editAreaTrabajo: document.getElementById('editAreaTrabajo'),
  editFechaIngreso: document.getElementById('editFechaIngreso'),
  overlay: document.getElementById('overlay'),
  popupEditar: document.getElementById('popupEditar'),
};

function generarTablaTrabajadores(data) {
  let contenidoTabla = '';
  data.forEach(item => {
    contenidoTabla += `
      <tr>
        <td data-label="Foto"><img src="${item.foto}" alt="Foto de ${item.nombre}" class="foto-trabajador"></td>
        <td data-label="Estado">${item.estado}</td>
        <td data-label="Tipo de Registro">${item.tipoRegistro}</td>
        <td data-label="ID">${item.id}</td>
        <td data-label="Nombre">${item.nombre}</td>
        <td data-label="Teléfono">${item.telefono}</td>
        <td data-label="Correo">${item.correo}</td>
        <td data-label="Área de Trabajo">${item.areaTrabajo}</td>
        <td data-label="Fecha de Ingreso">${item.fechaIngreso}</td>
        <td data-label="Acciones"><button class="accion-button" onclick="editarTrabajadorForm('${item.id}')">Editar</button></td>
      </tr>`;
  });
  elementos.tabla.innerHTML = contenidoTabla;
}

function editarTrabajadorForm(id) {
  const trabajador = trabajadores.find(item => item.id === id);
  if (trabajador) {
    const nip = prompt('Por favor ingresa el NIP para editar:');
    if (nip === '1234') { // Reemplaza '1234' con tu NIP real
      const {
        editFoto, editEstado, editTipoRegistro, 
        editID, editNombre, editTelefono,
        editCorreo, editAreaTrabajo, editFechaIngreso 
      } = elementos;

      editFoto.src = trabajador.foto;
      editEstado.value = trabajador.estado;
      editTipoRegistro.value = trabajador.tipoRegistro;
      editID.value = trabajador.id;
      editNombre.value = trabajador.nombre;
      editTelefono.value = trabajador.telefono;
      editCorreo.value = trabajador.correo;
      editAreaTrabajo.value = trabajador.areaTrabajo;
      editFechaIngreso.value = trabajador.fechaIngreso;

      abrirPopup('popupEditar');
    } else {
      alert('NIP incorrecto, no puedes editar.');
    }
  }
}

document.getElementById('editarTrabajadorForm').addEventListener('submit', function(event) {
  event.preventDefault();
  guardarEdicion();
});

function guardarEdicion() {
  if (!validarFormulario()) {
    return;
  }

  const trabajadorEditado = trabajadores.find(trabajador => trabajador.id === elementos.editID.value);

  if (trabajadorEditado) {
    trabajadorEditado.foto = nuevaFoto || trabajadorEditado.foto;
    trabajadorEditado.estado = elementos.editEstado.value;
    trabajadorEditado.tipoRegistro = elementos.editTipoRegistro.value;
    trabajadorEditado.nombre = elementos.editNombre.value;
    trabajadorEditado.telefono = elementos.editTelefono.value;
    trabajadorEditado.correo = elementos.editCorreo.value;
    trabajadorEditado.areaTrabajo = elementos.editAreaTrabajo.value;
    trabajadorEditado.fechaIngreso = elementos.editFechaIngreso.value;

    generarTablaTrabajadores(trabajadores);
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

let nuevaFoto;  

function actualizarFoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      nuevaFoto = e.target.result;  
    };
    reader.readAsDataURL(file);
  }
}

function resetearBusqueda() {
  document.getElementById('buscador').value = '';
  document.getElementById('fecha').value = '';
  document.getElementById('categoria').value = 'todos';

  generarTablaTrabajadores(trabajadores);
}

function abrirPopup(id) {
  elementos[id].style.display = 'block';
  elementos.overlay.style.display = 'block';
}

function cerrarPopup(id) {
  elementos[id].style.display = 'none';
  elementos.overlay.style.display = 'none';
}

let indiceTrabajadores = {};

function crearIndice() {
  trabajadores.forEach((trabajador, index) => {
    const valores = [
      trabajador.nombre,
      trabajador.tipoRegistro,
      trabajador.id,
      trabajador.telefono,
      trabajador.areaTrabajo,
      trabajador.correo,
      trabajador.estado,
      trabajador.fechaIngreso, // Añadir fecha de ingreso también al índice
    ];

    valores.forEach(valor => {
      if(valor) {
        const clave = valor.toLowerCase();
        if (!indiceTrabajadores[clave]) {
          indiceTrabajadores[clave] = [];
        }
        if (!indiceTrabajadores[clave].includes(index)) {
          indiceTrabajadores[clave].push(index);
        }
      }
    });
  });
}

function buscar() {
  const texto = elementos.buscador.value.toLowerCase();
  const categoriaVal = elementos.categoria.value;

  let resultados = new Set();

  if (texto) {
    const palabrasClave = texto.split(' ');
    palabrasClave.forEach(palabra => {
      if (indiceTrabajadores[palabra]) {
        indiceTrabajadores[palabra].forEach(index => {
          resultados.add(trabajadores[index]);
        });
      }
    });
  } else {
    trabajadores.forEach(trabajador => resultados.add(trabajador));
  }

  let fechaInicioVal = elementos.fechaInicio.value;
  let fechaFinVal = elementos.fechaFin.value;

  resultados = Array.from(resultados).filter(trabajador => {
    let fechaTrabajador = new Date(trabajador.fechaIngreso);
    let coincideFecha = true;

    if (fechaInicioVal) {
      let fechaInicio = new Date(fechaInicioVal);
      coincideFecha = coincideFecha && (fechaTrabajador >= fechaInicio);
    }

    if (fechaFinVal) {
      let fechaFin = new Date(fechaFinVal);
      coincideFecha = coincideFecha && (fechaTrabajador <= fechaFin);
    }

    const coincideCategoria = categoriaVal === "todos" || (trabajador.estado === categoriaVal);

    return coincideFecha && coincideCategoria;
  });

  generarTablaTrabajadores(resultados);
}

crearIndice();
generarTablaTrabajadores(trabajadores);

