$(document).ready(function(){
    cargarFiltros();
    $('#buscador, #fechaInicio, #fechaorden, #clase, #talla, #marca').on('input', function(){
        buscar();
    });
    
    $('#eliminarBusqueda').click(function(){
        limpiarBusqueda();
    });
});

function cargarFiltros(){
    $.ajax({
        url: 'php/obtener_filtros.php',
        type: 'GET',
        success: function(response){
            var filtros = JSON.parse(response);
            $('#marca').html(filtros.marcas);
            $('#clase').html(filtros.clases);
            $('#talla').html(filtros.tallas);
        }
    });
}

function buscar(){
    var texto = $('#buscador').val();
    var fechaInicio = $('#fechaInicio').val();
    var fechaorden = $('#fechaorden').val();
    var clase = $('#clase').val();
    var talla = $('#talla').val();
    var marca = $('#marca').val();

    $.ajax({
        url: 'php/busqueda_items.php',
        type: 'POST',
        data: {
            texto: texto,
            fechaInicio: fechaInicio,
            fechaorden: fechaorden,
            clase: clase,
            talla: talla,
            marca: marca
        },
        success: function(response){
            $('#tabla-items tbody').html(response);
        }
    });
}

function limpiarBusqueda(){
    $('#buscador').val('');
    $('#fechaInicio').val('');
    $('#fechaorden').val('reciente');
    $('#clase').val('todos');
    $('#talla').val('todos');
    $('#marca').val('todos');
    
    buscar();  
}
