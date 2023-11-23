async function verDatos(data){
	try{
		abrirPopup('popupVer');
		const response = await fetch('./php/obtenerDetalles2.php',{
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
        //console.log(result); //Para saber los datos que esta recibiendo del servidor
        const tableBody = document.getElementById('listaEPP').getElementsByTagName('tbody')[0];
        const titulo_folio = document.getElementById('folio_numero');
        titulo_folio.textContent = "Folio Numero: " + data;
        tableBody.innerHTML = '';

        result.forEach(item =>{
            const newRow = tableBody.insertRow();
            // Crear y agregar las celdas 
            const cell0 = newRow.insertCell(0);
            cell0.textContent = item.nombre_epp;
            cell0.className = "nombre_epp";

            const cell1 = newRow.insertCell(1);
            cell1.textContent = item.modelo;
            cell1.className = "modelo";

            const cell2 = newRow.insertCell(2);
            cell2.textContent = item.marca;
            cell2.className = "marca";

            const cell3 = newRow.insertCell(3);
            cell3.textContent = item.clase;
            cell3.className = "clase";

            const cell4 = newRow.insertCell(4);
            cell4.textContent = item.talla;
            cell4.className = "talla";
        });
       /*if(result.length > 0) {
            document.getElementById('observaciones').value = result[0].observacion;
        } else {
            document.getElementById('observaciones').value = '';
        }*/
	} catch (error){
		console.log(error);
	}
}