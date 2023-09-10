document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.qr-button').addEventListener('click', function() {
        let nombreHerramienta = document.getElementById('nombre').value;
        let noSerie = document.getElementById('noSerie').value;
        let estadoHerramienta = document.getElementById('estado').value;

        if(nombreHerramienta && estadoHerramienta && noSerie) {
            let toolInfo = {
                "toolId": noSerie,
                "toolName": nombreHerramienta,
                "toolStatus": estadoHerramienta
            };

            let toolInfoJSON = JSON.stringify(toolInfo);

            // Creando un canvas para el código QR
            let typeNumber = 0;
            let errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(toolInfoJSON);
            qr.make();
            let imgTag = qr.createImgTag(4);

            // Convertir imgTag a data URL (imagen PNG)
            let imgURL = imgTag.substring(imgTag.indexOf('src="') + 5, imgTag.indexOf('" ', imgTag.indexOf('src="') + 5));

            // Crear un enlace para descargar el QR como imagen
            let a = document.createElement('a');
            a.href = imgURL;
            a.download = 'QRCode.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            console.log('QR code y JSON generados con éxito');
            console.log('JSON:', toolInfoJSON);

            enviarABaseDeDatos(toolInfo);
        } else {
            alert('Por favor, rellene todos los campos requeridos antes de generar el QR.');
        }
    });
});

function enviarABaseDeDatos(datos) {
    // Aquí implementa la lógica para enviar los datos a tu base de datos
    // ...
}