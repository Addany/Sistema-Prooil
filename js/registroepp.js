$(document).ready(function() {
    // Inicializar Select2 en el select de nombre y permitir nuevas entradas
    $('#nombre').select2({
        tags: true,
        placeholder: 'Selecciona un EPP',
        allowClear: true
    })
    .on('select2:open', function() {
        // Cuando se abre, establece el placeholder del campo de búsqueda
        $('input.select2-search__field').attr('placeholder', 'Agrega un nuevo EPP');
        $('body').addClass('select-open');
    })
    .on('select2:close', function() {
        // Cuando se cierra, elimina la clase 'select-open'
        $('body').removeClass('select-open');
    });

    // Inicializar Select2 en el select de clase con las mismas funcionalidades
    $('#clase').select2({
        tags: true, // Permite la creación de nuevas opciones al escribir
        placeholder: 'Selecciona una clase', // Placeholder para el select
        allowClear: true // Permite borrar la selección
    })
    .on('select2:open', function() {
        // Cuando se abre, establece el placeholder del campo de búsqueda
        $('input.select2-search__field').attr('placeholder', 'Agrega una nueva clase');
        $('body').addClass('select-open');
    })
    .on('select2:close', function() {
        // Cuando se cierra, elimina la clase 'select-open'
        $('body').removeClass('select-open');
    });
});