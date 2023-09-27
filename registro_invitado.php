<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Entrada y Salida de Herramientas - Registro</title>
  <link rel="stylesheet" href="css/estiloslogin.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <?php
    include 'php/session.php';
    ?>
  <div id="page-container">
    <div id="navbar"></div>
    
    <div class="registration-container">
      <div class="image-container">
        <img id="output" class="image-preview" width="100" alt="Imagen del trabajador" />
      </div>
      <h2>Registro de Invitado</h2>
      <form id="registration-form" action="php/registro2.php" method="POST" enctype="multipart/form-data">
          <input type="text" name="name" placeholder="Nombre del Invitado" required>
          <input type="text" name="phone" placeholder="Teléfono" required>
          <input type="email" name="email" placeholder="Correo Electrónico" required>
          <label for=""> Introduce una foto:
          <input type="file" name="image" accept="image/*" onchange="previewImage(event)" required>
          </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>

    <video class="video-background" autoplay loop muted>
      <source src="Resources/Mi video-1.mp4" type="video/mp4">
    </video>
  </div>
  <script src="js/scriptnavegacion.js"></script>
  <script src="js/registroinvitado.js"></script>
</body>
</html>