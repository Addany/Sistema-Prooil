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
    <div id="page-container">
      <div id="navbar"></div>

      <script>
        $('#navbar').load('Navegacion/navbar.html', function() {
          $.getScript("Navegacion/navbar.js", function() {
            $('#page-container').fadeIn();
          });
        });
      </script>

      <div class="registration-container">
        <h2>Registro de almacenista</h2>
        <form>
          <input type="text" placeholder="Usuario" required>
          <input type="text" placeholder="Nombre" required>
          <input type="text" placeholder="Teléfono" required>
          <input type="email" placeholder="Correo Electrónico" required>
          <input type="password" placeholder="Contraseña" required>
          <input type="password" placeholder="Confirmar Contraseña" required>
          <button type="submit">Registrarse</button>
        </form>

      </div>

      <video class="video-background" autoplay loop muted>
        <source src="Resources/Mi video-1.mp4" type="video/mp4">
      </video>
    </div>
  <script src="js/registroinvitado.js"></script>
</body>
</html>