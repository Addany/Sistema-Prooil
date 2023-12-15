$(document).ready(function(){
    cargarAlmacenistas();
    $('#buscador, #almacenista').on('input change', function(){
        buscar();
    });

    $('#eliminarBusqueda').click(function(){
        limpiarBusqueda();
    });
});

function cargarAlmacenistas() {
    $.ajax({
        url: 'php/obtener_almacenistas_entregas.php',
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
    var almacenista = $('#almacenista').val();

    $.ajax({
        url: 'php/busqueda_entregas.php',
        type: 'POST',
        data: {
            texto: texto,
            almacenista: almacenista
        },
        success: function(response) {
            $('#tabla-historial tbody').html(response);
            aplicarAnimacionCeldas();
        }
    });
}

function limpiarBusqueda(){
    $('#buscador').val('');
    $('#almacenista').val('todos');
    buscar();  
}