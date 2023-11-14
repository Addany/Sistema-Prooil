$(document).ready(function() {
    // Inicializar Select2
    $('#nombre, #clase').select2({
        tags: true,
        placeholder: function(){
            $(this).data('placeholder');
        },
        allowClear: true
    }).on('select2:open', function() {
        // Ajustar el ancho del select a su contenedor
        var container = $(this).parent().get(0);
        var containerWidth = $(container).outerWidth();
        $('.select2-container').css('width', containerWidth);
        
        // Ajustes adicionales para cuando se abre el select
        $('input.select2-search__field').attr('placeholder', 'Agrega un nuevo elemento');
        $('body').addClass('select-open');
    }).on('select2:close', function() {
        // Ajustes cuando se cierra el select
        $('body').removeClass('select-open');
    });
});