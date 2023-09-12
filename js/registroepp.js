$(document).ready(function() {
  $('#nombre').select2({
      tags: true,
      placeholder: 'Agrega un EPP',
      allowClear: true
  }).on('select2:open', function() {
      $('body').addClass('select-open');
  }).on('select2:close', function() {
      $('body').removeClass('select-open');
  });
});

function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.createElement('img');
        output.src = reader.result;
        document.body.appendChild(output);
    };
    reader.readAsDataURL(event.target.files[0]);
}

$(document).ready(function() {

    $('.form-registro').on('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: 'tu_endpoint_url_aqui', // Reemplaza con la URL de tu backend
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert('Registro exitoso');
                // Aquí puedes hacer algo con la respuesta del backend
            },
            error: function(error) {
                alert('Error en el registro');
                // Aquí puedes manejar errores
            }
        });
    });

    // Inicialización del plugin select2
    $('#nombre').select2({
        placeholder: "Agrega un EPP"
    });
});

