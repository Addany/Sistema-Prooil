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
    var categoria = $('#categoria').val();
    var orden = $('#Orden').val();  

    $.ajax({
        url: 'php/busqueda_almacenistas.php',
        type: 'POST',
        data: {
            texto: texto,
            categoria: categoria,
            orden: orden  
        },
        success: function(response){
            $('#tabla-almacenistas tbody').html(response);
            aplicarAnimacionCeldas();
        }
    });
}

function aplicarAnimacionCeldas() {
    // Selecciona todas las celdas de la tabla actualizadas
    var celdas = document.querySelectorAll('#tabla-almacenistas td');
    
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
    
    buscar();  
}