$(document).ready(function(){
    cargarAlmacenistas();
    $('#buscador, #fechaInicio, #fechaFin, #status, #almacenista').on('input change', function(){
        buscar();
    });
    
    $('#eliminarBusqueda').click(function(){
        limpiarBusqueda();
    });
});

function cargarAlmacenistas() {
    $.ajax({
        url: 'php/obtener_almacenistas.php',
        type: 'GET',
        success: function(response) {
            var almacenistas = JSON.parse(response);
            var opcionesAlmacenista = '<option value="todos">Todos</option>';
            almacenistas.forEach(function(almacenista) {
                opcionesAlmacenista += '<option value="' + almacenista + '">' + almacenista + '</option>';
            });
            $('#almacenista').html(opcionesAlmacenista);
        }
    });
}

function buscar() {
    var texto = $('#buscador').val();
    var fechaInicio = $('#fechaInicio').val();
    var fechaFin = $('#fechaFin').val();
    var status = $('#status').val();
    var almacenista = $('#almacenista').val();

    $.ajax({
        url: 'php/busqueda_prestamo.php',
        type: 'POST',
        data: {
            texto: texto,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            status: status,
            almacenista: almacenista
        },
        success: function(response) {
            $('#tabla-historial tbody').html(response);
        }
    });
}

function limpiarBusqueda(){
    $('#buscador').val('');
    $('#fechaInicio').val('');
    $('#fechaFin').val('');
    $('#status').val('todos');
    $('#almacenista').val('todos');
    
    buscar();  
}