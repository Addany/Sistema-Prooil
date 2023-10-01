<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Entrada y Salida de Herramientas - Registro</title>
  <link rel="stylesheet" href="css/estiloslogin.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="icon" href="Resources/Icons/Register.ico">
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
        <h2>Registro de almacenista</h2>
        <form action="php/registro.php" method="POST">
          <input type="text" name="user" placeholder="Usuario" required>
          <input type="text" name="name" placeholder="Nombre" required>
          <input type="tel" name="phone" placeholder="Teléfono" required>
          <input type="email" name="email" placeholder="Correo Electrónico" required>
          <input type="password" name="password" placeholder="Contraseña" required>
          <input type="password" name="repassword" placeholder="Confirmar Contraseña" required>
          <button type="submit">Registrarse</button>
        </form>

      </div>

      <video class="video-background" autoplay loop muted>
        <source src="Resources/Mi video.webm" type="video/webm">
      </video>
    </div>
    
    <script src="js/scriptnavegacion.js"></script>
</body>
</html>