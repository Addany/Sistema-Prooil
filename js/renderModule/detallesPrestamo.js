async function verDetalles(data) {
    try {
        abrirPopup('popupVer');
        //console.log(data);
        //Peticion AJAX
        const response = await fetch('./php/obtenerDetalles.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                no_folio: data,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        console.log(result);
        const tableBody = document.getElementById('listaHerramientas').getElementsByTagName('tbody')[0];
        const titulo_folio = document.getElementById('folio_numero');
        titulo_folio.textContent = "Folio Numero: " + data;
        tableBody.innerHTML = '';

        result.forEach(item =>{
            const newRow = tableBody.insertRow();
            // Crear y agregar las celdas
            const cell0 = newRow.insertCell(0);
            if (item.devolucion) {
                cell0.innerHTML = '<input type="checkbox" checked disabled>';
            } else {
                cell0.innerHTML = '<input type="checkbox">';
            }

            const cell1 = newRow.insertCell(1);
            cell1.textContent = item.tipo_herramienta;

            const cell2 = newRow.insertCell(2);
            cell2.textContent = item.id_herramienta;

            const cell3 = newRow.insertCell(3);
            cell3.textContent = item.numero_serie;

            const cell4 = newRow.insertCell(4);
            cell4.textContent = item.marca;

            const cell5 = newRow.insertCell(5);
            cell5.textContent = item.devolucion;
        });
        if(result.length > 0) {
            document.getElementById('observaciones').value = result[0].observacion;
        } else {
            document.getElementById('observaciones').value = '';
        }

    } catch (error) {
        console.error(error);
    }
}