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
        document.getElementById("toolName").value = content;
        stopScan();
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

// Event listener para el formulario de préstamo
document.getElementById("loanForm").addEventListener("submit", function (event) {
  event.preventDefault();
  // Lógica para manejar el préstamo aquí

  // Después de manejar el préstamo, puedes resetear el formulario
  cancelLoan();
});

// Cuando la página se carga, muestra el mensaje de "Cámara Apagada"
window.onload = function() {
  document.getElementById("cameraOff").style.display = "block";
};
