document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('botonEnviar').addEventListener('click', function() {
    var herramientasAEnviar = [];
    var filas = document.querySelectorAll('#listaHerramientas tbody tr');
    var todasHerramientasDevueltas = true;
    var folioElement = document.getElementById('folio_numero');
    var folioNumero = folioElement.textContent.trim().split(" ").pop();

    filas.forEach(function(tr) {
      var checkbox = tr.querySelector('input[type="checkbox"]');
      var fechaDevolucion = tr.querySelector('.fecha_devolucion');
      var idHerramienta = tr.querySelector('.id_herramienta');
      if (!checkbox.checked) {
        todasHerramientasDevueltas = false;
      }else if (!fechaDevolucion.textContent.trim()) {
        herramientasAEnviar.push(idHerramienta.textContent.trim());
      }
    });

    if (todasHerramientasDevueltas) {
      actualizarFolioPrestamo(folioNumero);
    }
    if (herramientasAEnviar.length > 0) {
      enviarHerramientas(herramientasAEnviar);
    }else{
      console.log("No se envio ninguna herramienta")
      cerrarPopup('popupVer')
    }
  });
});

function enviarHerramientas(ids) {
  var folioElement = document.getElementById('folio_numero');
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './php/actualizarPrestamo.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var respuesta = JSON.parse(this.responseText);
      console.log(this.responseText);
    }
  };
  xhr.send('ids=' + JSON.stringify(ids));
  setTimeout(function() {
    window.location.reload();
  }, 500);
}

function actualizarFolioPrestamo(folio) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './php/actualizarFolioPrestamo.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      var respuesta = JSON.parse(this.responseText);
      console.log(this.responseText);
    }
  };
  xhr.send('folio=' + folio);
}