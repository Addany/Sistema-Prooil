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

function aplicarAnimacionCeldas() {
    // Selecciona todas las celdas de la tabla actualizadas
    var celdas = document.querySelectorAll('#tabla-historial td');
    
    // Reinicia y aplica la animación a cada celda
    celdas.forEach(function(celda) {
        celda.classList.remove('celda-visible', 'celda-oculta');
        celda.offsetWidth; // Trigger a reflow para reiniciar la animación
        celda.classList.add('celda-oculta');
        
        // Utiliza Intersection Observer para aplicar la animación cuando la celda sea visible
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('celda-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(celda);
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
