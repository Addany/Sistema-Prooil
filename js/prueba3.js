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
        url: 'php/filtros_epp.php',
        type: 'GET',
        success: function(response){
            var filtros = JSON.parse(response);
            
            var opcionesMarca = '<option value="todos">Todos</option>';
            filtros.marcas.forEach(function(marca) {
                opcionesMarca += '<option value="' + marca + '">' + marca + '</option>';
            });
            $('#marca').html(opcionesMarca);

            // Cargar Clases
            var opcionesClase = '<option value="todos">Todos</option>';
            filtros.clases.forEach(function(clase) {
                opcionesClase += '<option value="' + clase + '">' + clase + '</option>';
            });
            $('#clase').html(opcionesClase);

            // Cargar Tallas
            var opcionesTalla = '<option value="todos">Todos</option>';
            filtros.tallas.forEach(function(talla) {
                opcionesTalla += '<option value="' + talla + '">' + talla + '</option>';
            });
            $('#talla').html(opcionesTalla);
        }
    });
}

function buscar() {
    var texto = $('#buscador').val();
    var clase = $('#clase').val();
    var talla = $('#talla').val();
    var marca = $('#marca').val();
    var fechaorden = $('#fechaorden').val();

    $.ajax({
        url: 'php/busqueda_epp.php',
        type: 'POST',
        data: {
            texto: texto,
            clase: clase,
            talla: talla,
            marca: marca,
            fechaorden: fechaorden 
        },
        success: function(response) {
            console.log(response); // Esto mostrará la respuesta en la consola del navegador
            $('#tabla-historial tbody').html(response);
            aplicarAnimacionCeldas();
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
