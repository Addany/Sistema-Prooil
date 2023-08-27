const usuariosYAdmins = [
  {
    id: 1,
    nombre: 'Usuario 1',
    rol: 'Usuario',
    contraseña: 'contraseña1',
    correo: 'usuario1@example.com'
  },
  {
    id: 2,
    nombre: 'Administrador 1',
    rol: 'Administrador',
    contraseña: 'contraseña2',
    correo: 'admin1@example.com'
  },
  // Agregar más datos aquí
];

function abrirPopupEdicion(usuario) {
  const popup = document.getElementById('popup');
  popup.innerHTML = '';

  const formEditarUsuario = document.createElement('form');
  formEditarUsuario.classList.add('popup-content');

  // Crear elementos label e input para cada propiedad del usuario
  const propiedades = ['ID', 'Nombre', 'Rol', 'Contraseña', 'Correo'];
  const propiedadesKeys = ['id', 'nombre', 'rol', 'contraseña', 'correo'];

  propiedades.forEach((propiedad, index) => {
    const label = document.createElement('label');
    label.textContent = `${propiedad}:`;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = usuario[propiedadesKeys[index]];
    formEditarUsuario.appendChild(label);
    formEditarUsuario.appendChild(input);
  });

  const guardarCambiosBtn = document.createElement('button');
  guardarCambiosBtn.textContent = 'Guardar Cambios';

  guardarCambiosBtn.addEventListener('click', () => {
    propiedadesKeys.forEach((key, index) => {
      usuario[key] = formEditarUsuario.querySelectorAll('input')[index].value;
    });
    generarResultados();
    popup.style.display = 'none';
  });

  const cancelarCambiosBtn = document.createElement('button');
  cancelarCambiosBtn.textContent = 'Cancelar';
  cancelarCambiosBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  formEditarUsuario.appendChild(guardarCambiosBtn);
  formEditarUsuario.appendChild(cancelarCambiosBtn);

  popup.appendChild(formEditarUsuario);
  popup.style.display = 'flex';
}

function generarResultados(usuarios = usuariosYAdmins) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';

  usuarios.forEach(usuario => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    // Crear elementos p y span para mostrar los datos de usuario
    const propiedades = ['ID', 'Nombre', 'Rol', 'Contraseña', 'Correo'];

    propiedades.forEach(propiedad => {
      const p = document.createElement('p');
      p.textContent = `${propiedad}: ${usuario[propiedad.toLowerCase()]}`;
      resultItem.appendChild(p);
    });

    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar';
    editarBtn.classList.add('editar');
    editarBtn.addEventListener('click', () => {
      abrirPopupEdicion(usuario);
    });
    resultItem.appendChild(editarBtn);

    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.classList.add('eliminar');
    eliminarBtn.addEventListener('click', () => {
      eliminarUsuario(usuario);
    });
    resultItem.appendChild(eliminarBtn);

    resultsContainer.appendChild(resultItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', () => {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsuarios = usuariosYAdmins.filter(usuario =>
      Object.values(usuario).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchText)
      )
    );
    generarResultados(filteredUsuarios);
  });

  generarResultados();
});
