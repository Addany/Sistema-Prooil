// Variables para el escaneo
let scanner = null;
let isScanning = false;

// Función para iniciar el escaneo
function startScan() {
    document.getElementById("cameraOff").style.display = "none";
    if (!scanner) {
        const videoElem = document.getElementById("preview");
        scanner = new Instascan.Scanner({ video: videoElem });
        scanner.addListener("scan", function (content) {
            if (isScanning) {
                onToolScanned(content);
            }
        });
    }

    Instascan.Camera.getCameras()
        .then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
                isScanning = true;
            } else {
                console.error("No se encontraron cámaras en el dispositivo.");
            }
        })
        .catch(function (error) {
            console.error("Error al acceder a la cámara:", error);
        });
}

// Función para detener el escaneo
function stopScan() {
    document.getElementById("cameraOff").style.display = "block";
    if (scanner && isScanning) {
        scanner.stop();
        isScanning = false;
    }
}

// Función para cancelar el préstamo
function cancelLoan() {
    document.getElementById("loanForm").reset();
    stopScan();
}

document.getElementById("loanForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Lógica para manejar el préstamo aquí

    // Después de manejar el préstamo, puedes resetear el formulario
    cancelLoan();

    // Aquí es donde podrías mostrar el mensaje de éxito
    var folioNumber = 1234; // Supongamos que este es el número de folio generado
    Swal.fire('Éxito', 'Folio generado con éxito: ' + folioNumber, 'success');
});

// Cuando la página se carga, muestra el mensaje de "Cámara Apagada" y 
// inicia la cámara automáticamente
window.onload = function () {
    document.getElementById("cameraOff").style.display = "block";
    startScan();
};

// Función que se llama cada vez que se escanea una herramienta
function onToolScanned(toolInfo) {
    // Supongamos que 'toolInfo' es una cadena JSON con la información de la herramienta
    var toolData = JSON.parse(toolInfo);

    // Encuentra la tabla de herramientas escaneadas
    var scannedToolsTable = document.getElementById("scanned-tools-table");

    // Crea una nueva fila y celdas
    var row = scannedToolsTable.insertRow(1); // Inserta la nueva fila en la segunda posición (índice 1)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    // Asigna los valores a las celdas
    cell1.innerHTML = toolData.toolId;
    cell2.innerHTML = toolData.toolName;
    cell3.innerHTML = toolData.toolStatus;
    cell4.innerHTML = "<button onclick='deleteRow(this)' class='buttonform'>Eliminar</button>";
}

// Función para eliminar una fila
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
