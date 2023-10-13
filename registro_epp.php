<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de EPP</title>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="css/estiloregistroEPP.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="icon" href="Resources/Icons/EPP.ico">
</head>
<body>
    <?php
    include 'php/session.php';
    ?>

    <div id="page-container">
        <div id="navbar"></div>
          
        <div class="container">
            <div class="form-container">
                <div class="header-container">
                    <h1>Registro de EPP</h1>
                    <div class="image-container">
                        <img id="output" class="image-preview" width="100" alt="" />
                    </div>
                </div>

                <form class="form-registro" action="php/registro4.php" method="POST" enctype="multipart/form-data">
                    <div class="input-section">
                        <div class="left-section">
                            <div class="input-group">
                                <label for="nombre">Nombre:</label>
                                <select id="nombre" name="name" required data-placeholder="Selecciona un EPP">
                                    <option></option> 
                                    <option value="EPP1">EPP1</option>
                                    <option value="EPP2">EPP2</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label for="cantidad">Cantidad:</label>
                                <input type="number" id="cantidad" name="amount" required>
                            </div>
                            <div class="input-group">
                                <label for="marca">Marca:</label>
                                <input type="text" id="marca" name="brand" required>
                            </div>
                            <div class="input-group">
                                <label for="modelo">Modelo:</label>
                                <input type="text" id="modelo" name="model" required>
                            </div>
                        </div>
                        <div class="right-section">
                            <div class="input-group">
                                <label for="tipo">Talla:</label>
                                <input type="text" id="tipo" name="size" required>
                            </div>
                            <div class="input-group">
                                <label for="clase">Clase:</label>
                                <input type="text" id="clase" name="class" required>
                            </div>
                            <div class="input-group">
                                <label for="ordenCompra">Orden de Compra:</label>
                                <input type="text" id="ordenCompra" name="purchase_order" required>
                            </div>
                            <div class="input-group">
                                <label class="file-label" for="worker_image">Foto EPP:</label>
                                <input type="file" id="worker_image" name="worker_image" class="file-input" accept="image/*" onchange="previewImage(event)" required>
                            </div>
                        </div>
                    </div>
                        <button type="submit" class="registrar-button">Registrar EPP</button>
                    </div>  
                </form>
            </div>
        </div>
    </div>

    <video class="video-background" autoplay loop muted>
        <source src="Resources/Mi video.webm" type="video/webm">
    </video>
    
    
    <script src="js/scriptnavegacion.js"></script>
    <script src="js/registroepp.js"></script>
    <script src="js/scripttimagen.js"></script>


</body>
</html>
