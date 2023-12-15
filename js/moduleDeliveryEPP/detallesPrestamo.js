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

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todas las celdas de todas las tablas
    var celdas = document.querySelectorAll('td');
    
    // Agrega la clase inicial a todas las celdas
    celdas.forEach(function(celda) {
        celda.classList.add('celda-oculta');
    });
  
    // Función para observar las celdas
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('celda-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
  
    // Observa cada celda
    celdas.forEach(function(celda) {
        observer.observe(celda);
    });
  });
  
  