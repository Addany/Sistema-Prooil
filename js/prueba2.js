$(document).ready(function(){
    cargarAreas();
    $('#buscador, #fechaInicio, #categoria, #tipoRegistro, #Area, #Orden').on('input change', function(){
        buscar();
    });
    
    $('#limpiarBtn').click(function(){
        limpiarBusqueda();
    });
});

function cargarAreas(){
    $.ajax({
        url: 'php/obtener_areas.php',
        type: 'GET',
        success: function(response){
            var areas = JSON.parse(response);
            var options = '<option value="todos">Todos</option>';
            for(var i=0; i<areas.length; i++){
                options += '<option value="'+areas[i]+'">'+areas[i]+'</option>';
            }
            $('#Area').html(options);
        }
    });
}

function buscar(){
    var texto = $('#buscador').val();
    var categoria = $('#categoria').val();
    var tipoRegistro = $('#tipoRegistro').val();
    var area = $('#Area').val();
    var orden = $('#Orden').val(); // Añadir esta línea para capturar el valor de orden

    $.ajax({
        url: 'php/busqueda_trabajadores.php',
        type: 'POST',
        data: {
            texto: texto, 
            categoria: categoria, 
            tipoRegistro: tipoRegistro, 
            Area: area,
            orden: orden  // Añadir 'orden' a la data enviada
        },  
        success: function(response){
            $('#tabla-trabajadores tbody').html(response);
        }
    });
}

function limpiarBusqueda(){
    $('#buscador').val('');
    $('#fechaInicio').val('');
    $('#categoria').val('todos');  
    $('#tipoRegistro').val('todos'); 
    $('#Area').val('todos'); 
    $('#Orden').val('reciente'); 
    
    buscar();  
}