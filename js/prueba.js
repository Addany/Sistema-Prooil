$(document).ready(function(){
    $('#buscador, #fechaInicio, #categoria, #Orden').on('input change', function(){
        buscar();
    });

    $('#limpiarBtn').click(function(){
        limpiarBusqueda();
    });
});

function buscar(){
    var texto = $('#buscador').val();
    var fechaInicio = $('#fechaInicio').val();
    var categoria = $('#categoria').val();
    var orden = $('#Orden').val();  

    $.ajax({
        url: 'php/busqueda_almacenistas.php',
        type: 'POST',
        data: {
            texto: texto,
            fechaInicio: fechaInicio,
            categoria: categoria,
            orden: orden  
        },
        success: function(response){
            $('#tabla-almacenistas tbody').html(response);
        }
    });
}

function limpiarBusqueda(){
    $('#buscador').val('');
    $('#fechaInicio').val('');
    $('#categoria').val('todos');  
    
    buscar();  
}