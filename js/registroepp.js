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

