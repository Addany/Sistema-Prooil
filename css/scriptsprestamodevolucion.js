// Variables para el escaneo
let scanner = null;
let isScanning = false;

// Función para iniciar el escaneo
function startScan() {
  if (!scanner) {
    const videoElem = document.getElementById("preview");
    scanner = new Instascan.Scanner({ video: videoElem });
    scanner.addListener("scan", function (content) {
      if (isScanning) {
        document.getElementById("toolQR").value = content;
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

// Función para cancelar la devolución
function cancelReturn() {
  document.getElementById("returnForm").reset();
  stopScan();
}

// Event listener para el formulario de devolución
document.getElementById("returnForm").addEventListener("submit", function (event) {
  event.preventDefault();
  // Lógica para manejar la devolución aquí

  // Después de manejar la devolución, puedes resetear el formulario
  cancelReturn();
});

