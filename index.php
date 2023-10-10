<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Entrada y Salida de Herramientas - Iniciar Sesión</title>
  <link rel="stylesheet" href="css/estiloslogin.css">
  <link rel="icon" href="Resources/Icons/Logout.ico">
</head>
<body>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form action="php/login.php" method="POST">
      <input type="text" name="username" placeholder="Usuario" required>
      <input type="password" name="password" placeholder="Contraseña" required>
      <button type="submit">Ingresar</button>
    </form> 
  </div>

   <video class="video-background" autoplay loop muted>
    <source src="Resources/Mi video.webm" type="video/mp4">
  </video>
</body>
</html>