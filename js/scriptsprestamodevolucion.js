$(document).ready(function () {
    let $workerNameSelect = $('.workerName');
    $workerNameSelect.select2();

    // Escuchar el evento "select2:select" en lugar de "change"
    $workerNameSelect.on('select2:select', function(e) {
        let selectedValue = $(this).val();
        localStorage.setItem('workerName', selectedValue);
    });

    // Continúa con la carga inicial de la página
    loadLastSession();
});


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

function cancelLoan() {
    document.getElementById("loanForm").reset();
    localStorage.removeItem('scannedTools');
    localStorage.removeItem('observations');
    localStorage.removeItem('workerName');  // Esta línea elimina workerName del localStorage

    // Resetear el valor del select usando Select2
    $('.workerName').val(null).trigger('change'); 
    
    // Limpiar la tabla de herramientas escaneadas
    var scannedToolsTable = document.getElementById("scanned-tools-table");
    var rows = scannedToolsTable.rows.length;
    for (var i = rows - 1; i > 0; i--) {
        scannedToolsTable.deleteRow(i);
    }
}

function loadLastSession() {
    // Cargar las observaciones anteriores
    const observations = localStorage.getItem('observations');
    if (observations) {
        document.getElementById('observations').value = observations;
    }

    const workerName = localStorage.getItem('workerName');
    if (workerName) {
        document.getElementById('workerName').value = workerName;
        $('.workerName').val(workerName).trigger('change'); 
    }

    // Cargar las herramientas escaneadas anteriores
    try {
        const scannedTools = JSON.parse(localStorage.getItem('scannedTools') || '[]');
        scannedTools.forEach(tool => {
            addToolToTable(tool);
        });
    } catch (error) {
        console.error("Error cargando las herramientas escaneadas:", error);
    }
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

function onToolScanned(toolInfo) {
    var toolData = JSON.parse(toolInfo);

    // Añadir la herramienta escaneada al localStorage
    var scannedTools = JSON.parse(localStorage.getItem('scannedTools') || '[]');
    scannedTools.push(toolData);
    localStorage.setItem('scannedTools', JSON.stringify(scannedTools));

    addToolToTable(toolData);
}

function addToolToTable(toolData) {
    var scannedToolsTable = document.getElementById("scanned-tools-table");
    var row = scannedToolsTable.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = toolData.toolId;
    cell2.innerHTML = toolData.toolName;
    cell3.innerHTML = toolData.toolStatus;
    cell4.innerHTML = "<button onclick='deleteRow(this)' class='buttonform'>Eliminar</button>";
}


function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    var toolId = row.cells[0].innerText;  // Obtener el ID de la herramienta de la fila que será eliminada

    // Obtener las herramientas escaneadas del almacenamiento local
    var scannedTools = JSON.parse(localStorage.getItem('scannedTools') || '[]');

    // Encontrar el índice de la herramienta en el array scannedTools basado en el toolId
    var toolIndex = scannedTools.findIndex(tool => tool.toolId === toolId);

    // Eliminar la herramienta del array scannedTools y actualizar el almacenamiento local
    if (toolIndex > -1) {
        scannedTools.splice(toolIndex, 1);
        localStorage.setItem('scannedTools', JSON.stringify(scannedTools));
    }

    // Eliminar la fila de la tabla
    row.parentNode.removeChild(row);
}


document.getElementById('observations').addEventListener('input', function() {
localStorage.setItem('observations', this.value);
});

document.getElementById("workerName").addEventListener("change", function() {
    localStorage.setItem('workerName', this.value);
});
