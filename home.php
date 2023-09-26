<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/estilos.css">
  <link rel="stylesheet" href="css/navbar.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <title>Navegación Responsive</title>
</head>
<body>
  <?php 
  include 'php/session.php';
  ?>

  <div id="page-container">
    <div id="navbar"></div>

    <div class="slideshow-container">
      <div class="slide fade">
        <img src="Resources/Imagen1.jpg" alt="Imagen 1">
      </div>
      <div class="slide fade">
        <img src="Resources/Imagen2.jpg" alt="Imagen 2">
      </div>
      <div class="slide fade">
        <img src="Resources/Imagen4.jpg" alt="Imagen 3">
      </div>
    </div>

    <div class="welcome-text">
      <h1>Bienvenido al sistema <?php echo "$almacenista"; ?></h1>
    </div>

    <div class="button-container">
      <button class="custom-button open-popup-button"  onclick="openPopup()" >
        <i class="fa-solid fa-caret-down fa-beat"></i> Iniciar 
      </button>
    </div>


    <div class="popup-overlay" onclick="closePopup()"></div>
    <div class="popup">
      <h2>¿Qué acción deseas realizar?</h2>
      <div class="popup-buttons">
        <a href="prestamo_herramienta.php" class="button">Hacer un préstamo</a>
        <a href="entrega_epp.php" class="button">Hacer una entrega</a>
        <button onclick="closePopup()" class="button">Cerrar</button>
    </div>
    </div>

  </div>

  <script src="js/scriptnavegacion.js"></script>
  <script src="js/ScriptsIndex/scripts.js"></script>
  <script src="js/ScriptsIndex/popup.js"></script>

</body>
</html>

