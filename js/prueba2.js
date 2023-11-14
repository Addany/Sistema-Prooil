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
    var tipoRegistro = $('#tipoRegistro').val(); // Captura el valor seleccionado de tipo de registro
    var area = $('#Area').val();
    var orden = $('#Orden').val();

    $.ajax({
        url: 'php/busqueda_trabajadores.php',
        type: 'POST',
        data: {
            texto: texto, 
            categoria: categoria, 
            tipoRegistro: tipoRegistro, // Envía el tipo de registro
            Area: area,
            orden: orden
        },
        success: function(response){
            $('#tabla-trabajadores tbody').html(response);
            aplicarAnimacionCeldas();
        }
    });
}

function aplicarAnimacionCeldas() {
    // Selecciona todas las celdas de la tabla actualizadas
    var celdas = document.querySelectorAll('#tabla-trabajadores td');
    
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
    $('#categoria').val('todos');
    $('#tipoRegistro').val('todos'); // Resetea el selector de tipo de registro
    $('#Area').val('todos');
    $('#Orden').val('reciente');
    
    buscar();
}