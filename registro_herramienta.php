<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Herramienta</title>
    <link rel="stylesheet" href="css/estiloregistroherramientas.css">
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
        <div class="container">
            <div class="form-container">
                <h1>Registro de Herramienta</h1>
                <form class="form-registro">
                    <div class="input-section">
                        <div class="left-section">
                            <div class="input-group">
                                <label for="tipo de herramienta">Tipo de herramienta:</label>
                                <input type="text" id="tipoHerramienta" required>
                            </div>
                            <div class="input-group">
                                <label for="marca">Marca:</label>
                                <input type="text" id="marca" required>
                            </div>
                            <div class="input-group">
                                <label for="tamaño">Tamaño:</label>
                                <input type="text" id="tamaño" required>
                            </div>
                            <div class="input-group">
                                <label for="ordenCompra">Orden de Compra:</label>
                                <input type="text" id="ordenCompra" required>
                            </div>
                            <div class="descripcion-group">
                                <label for="descripcion">Descripción:</label>
                                <textarea id="descripcion" required></textarea>
                            </div>
                        </div>
                        <div class="right-section">
                            <div class="input-group">
                                <label for="tipo">Tipo de Herramienta:</label>
                                <select id="tipo" required>
                                    <option value="manual">Manual</option>
                                    <option value="electrica">Eléctrica</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label for="color">Color:</label>
                                <input type="text" id="color" required>
                            </div>
                            <div class="input-group">
                                <label for="noSerie">Número de Serie:</label>
                                <input type="text" id="noSerie" required>
                            </div>
                            <div class="input-group">
                                <label for="estado">Estado de la Herramienta:</label>
                                <select id="estado" required>
                                    <option value="bueno">Bueno</option>
                                    <option value="regular">Regular</option>
                                    <option value="malo">Malo</option>
                                </select>
                            </div>
                            <label class="file-label" for="worker_image">Foto Herramienta:</label>
                            <input type="file" id="worker_image" name="worker_image" class="file-input" accept="image/*" onchange="previewImage(event)" required>
                        </div>
                    </div>
                </form>
            </div>
            <div class="button-group"> 
                <button type="submit" class="registrar-button">Registrar Herramienta</button>
                <button type="button"  class="qr-button">Descargar QR</button>
            </div>
        </div>
    </div>
    
    <script src="js/scriptnavegacion.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1/qrcode.min.js"></script>
    <script src="js/registroherramienta.js"></script>
</body>
</html>