function buscar() {
    const textoBuscar = document.getElementById('buscador').value.trim().toLowerCase();
    const fechaInicio = document.getElementById('fechaInicio').value ? new Date(document.getElementById('fechaInicio').value) : null;
    const fechaFin = document.getElementById('fechaFin').value ? new Date(document.getElementById('fechaFin').value) : null;
    const categoriaBuscar = document.getElementById('categoria').value;

    if (!historialPrestamo || !Array.isArray(historialPrestamo)) {
        console.error('historialPrestamo no está definido o no es un arreglo');
        return;
    }

    const resultados = historialPrestamo.filter(item => {
        const itemMinusculas = {
            folio: item.folio?.trim().toLowerCase(),
            nombreTrabajador: item.nombreTrabajador?.trim().toLowerCase(),
            quienAutorizo: item.quienAutorizo?.trim().toLowerCase(),
            observaciones: item.observaciones?.trim().toLowerCase(),
        };

        const fechaTransaccion = new Date(item.fechaTransaccion);
        const fechaDevolucion = new Date(item.fechaDevolucion);

        const coincideTexto = textoBuscar ? Object.values(itemMinusculas).some(val => val?.includes(textoBuscar)) : true;
        const coincideCategoria = categoriaBuscar !== 'todos' ? item.estado === categoriaBuscar : true;

        const coincideFechaTransaccion = (fechaInicio ? fechaTransaccion >= fechaInicio : true) && (fechaFin ? fechaTransaccion <= fechaFin : true);
        const coincideFechaDevolucion = (fechaInicio ? fechaDevolucion >= fechaInicio : true) && (fechaFin ? fechaDevolucion <= fechaFin : true);

        return coincideTexto && coincideCategoria && coincideFechaTransaccion && coincideFechaDevolucion;
    });

    generarTablaHistorial(resultados);
}

let debounceTimer;
function buscarConDebounce() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(buscar, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    generarTablaHistorial(historialPrestamo);
    document.getElementById('buscador').addEventListener('input', buscarConDebounce);
});