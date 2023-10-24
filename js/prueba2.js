$(document).ready(function(){
    $('#buscador, #fechaInicio, #fechaFin, #categoria').on('input', function(){
        buscar();
    });
    
    $('#limpiarBtn').click(function(){
        limpiarBusqueda();
    });
});

function buscar(){
    var texto = $('#buscador').val();
    var fechaInicio = $('#fechaInicio').val();
    var fechaFin = $('#fechaFin').val();
    var categoria = $('#categoria').val();
    
    $.ajax({
        url: 'php/busqueda_trabajadores',
        type: 'POST',
        data: {texto: texto, fechaInicio: fechaInicio, fechaFin: fechaFin, categoria: categoria},
        success: function(response){
            $('#tabla-trabajadores tbody').html(response);
        }
    });
}

function limpiarBusqueda(){
    $('#buscador').val('');
    $('#fechaInicio').val('');
    $('#fechaFin').val('');
    $('#categoria').val('todos');  
    
    buscar();  
}
