let nuevaFoto;  

function actualizarFoto(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          nuevaFoto = e.target.result;
          document.getElementById("editFoto").src = nuevaFoto;  
      };
      reader.readAsDataURL(file);
  }
}

function solicitarNIP() {
  return new Promise((resolve, reject) => {
    const nip = prompt('Por favor, ingrese su NIP:');
    if (nip === '1234') {  
      resolve();
    } else {
      alert('NIP incorrecto');
      reject(new Error('NIP incorrecto'));
    }
  });
}


async function editarHerramienta(button) {  
  try {

    await solicitarNIP();

    let row = button.closest('tr');
    
    document.getElementById("editFoto").src = row.querySelector('[data-label="Foto"] img').src;
    document.getElementById("editUsuario").value = row.querySelector('[data-label="ID"]').innerText;
    document.getElementById("editTipoherramienta").value = row.querySelector('[data-label="Tipo de herramienta"]').innerText;
    document.getElementById("editMarca").value = row.querySelector('[data-label="Marca"]').innerText;
    document.getElementById("editTamano").value = row.querySelector('[data-label="Tamaño"]').innerText;
    document.getElementById("editOrdenCompra").value = row.querySelector('[data-label="Orden de compra"]').innerText;
    document.getElementById("editNoSerie").value = row.querySelector('[data-label="No. Serie"]').innerText;
    document.getElementById("editEstado").value = row.querySelector('[data-label="Estado"]').innerText.toLowerCase();
    document.getElementById("editColor").value = row.querySelector('[data-label="Color"]').innerText;
    let fecha = row.querySelector('[data-label="Fecha de Registro"]').innerText.split("-").reverse().join("-");
    document.getElementById("editFecha").value = fecha;
    document.getElementById("editEstatus").value = row.querySelector('[data-label="Estatus"]').innerText.toLowerCase();

    abrirPopup('popup');
  } catch (error) {
    console.error("Error al editar herramienta:", error);
  }
}