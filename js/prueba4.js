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
    $('#fechaFin').val('');
    $('#status').val('todos');
    $('#almacenista').val('todos');
    
    buscar();  
}