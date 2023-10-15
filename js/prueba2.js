document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buscador').addEventListener('input', buscar);
    document.getElementById('fechaInicio').addEventListener('change', buscar);
    document.getElementById('fechaFin').addEventListener('change', buscar);
    document.getElementById('categoria').addEventListener('change', buscar);
    document.querySelector('.form-buscar button').addEventListener('click', limpiarBusqueda);
});

function buscar() {
    const textoBuscar = document.getElementById('buscador').value.trim().toLowerCase();
    console.log('Texto a buscar:', textoBuscar);

    const fechaInicio = document.getElementById('fechaInicio').value ? new Date(document.getElementById('fechaInicio').value) : null;
    const fechaFin = document.getElementById('fechaFin').value ? new Date(document.getElementById('fechaFin').value) : null;
    const categoriaBuscar = document.getElementById('categoria').value.toLowerCase();

    const tabla = document.getElementById('tabla-trabajadores');
    const filas = tabla.querySelectorAll('tbody tr');
    filas.forEach((fila, index) => {
        const celdas = {
            estado: fila.querySelector("td[data-label='Estado']"),
            tipoRegistro: fila.querySelector("td[data-label='Tipo de Registro']"),
            id: fila.querySelector("td[data-label='ID']"),
            nombre: fila.querySelector("td[data-label='Nombre']"),
            area: fila.querySelector("td[data-label='Area']"),
            correo: fila.querySelector("td[data-label='Correo Electrónico']"),
            fechaIngreso: fila.querySelector("td[data-label='Fecha de Ingreso']"),
        };

        console.log('ID en la fila', index + 1, ':', celdas.id.textContent);

        const celdasParaTexto = [celdas.tipoRegistro, celdas.id, celdas.nombre, celdas.area, celdas.correo];

        const coincideTexto = textoBuscar ?
            celdasParaTexto.some(celda => celda && celda.textContent.toLowerCase().includes(textoBuscar)) :
            true;

        const coincideCategoria = categoriaBuscar !== 'todos' ? celdas.estado.textContent.toLowerCase() === categoriaBuscar : true;

        const fechaIngresoDate = new Date(celdas.fechaIngreso.textContent);
        const coincideFecha = (fechaInicio ? fechaIngresoDate >= fechaInicio : true) && (fechaFin ? fechaIngresoDate <= fechaFin : true);

        if (coincideTexto && coincideCategoria && coincideFecha) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

function limpiarBusqueda() {
    document.getElementById('buscador').value = '';
    document.getElementById('fechaInicio').value = '';
    document.getElementById('fechaFin').value = '';
    document.getElementById('categoria').value = 'todos';
    buscar();
}
