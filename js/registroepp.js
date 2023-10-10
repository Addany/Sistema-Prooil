$(document).ready(function() {
    $('#nombre').select2({
        tags: true,
        placeholder: 'Agrega un EPP',
        allowClear: true
    })
    .on('select2:open', function() {
        // Buscamos el campo de búsqueda y le asignamos el placeholder
        $('input.select2-search__field').attr('placeholder', 'Agrega un nuevo EPP');
        $('body').addClass('select-open');
    })
    .on('select2:close', function() {
        $('body').removeClass('select-open');
    });
});

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
      const output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  
