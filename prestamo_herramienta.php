<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prestamos de Herramientas</title>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/estilosprestamodevolucion.css">
    <link rel="icon" href="Resources/Icons/">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body>
    <?php
    include 'php/session.php';
    include 'php/conexion_bd.php'
    ?>
    <header>
        
    </header>


    <div id="page-container">
        <div id="navbar"></div>

        <main>
            <section class="container">
                <div class="form-container">
                    <h3>Formulario de Préstamo</h3>

                    <?php
                    $queryEmpleado = "SELECT id_trabajador, nombre FROM empleado";
                    $resultEmpleado = mysqli_query($conexion, $queryEmpleado);

                    $options = "<option value=''>Selecciona una persona</option>";
                    while($row = mysqli_fetch_assoc($resultEmpleado)) {
                        $id = $row['id_trabajador'];
                        $nombre = $row['nombre'];
                        $options .= "<option value='e_$id'>Empleado: $id - $nombre</option>";
                    }
                    $queryInvitado = "SELECT id_invitado, nombre FROM invitado";
                    $resultInvitado = mysqli_query($conexion, $queryInvitado);
                    while($row = mysqli_fetch_assoc($resultInvitado)) {
                        $id = $row['id_invitado'];
                        $nombre = $row['nombre'];
                        $options .= "<option value='i_$id'>Invitado: $id - $nombre</option>";
                    }
                    ?>

                    <form id="loanForm">
                        <label for="almacenName">Almacenista en Solicitud: <?php echo "$almacenista";?></label>
                        <br>
                        <label for="workerName">Nombre del Trabajador:</label>
                        <select id="workerName" class="workerName" name="petitioner" required>
                            <?php echo $options; ?>
                        </select>
                        <div class="scanned-tools">
                            <br>
                            <Label>Herramientas Escaneadas:</Label>
                            <div id="tableContainer" class="table-container">
                                <table id="scanned-tools-table">
                                    <thead>
                                        <tr>
                                            <th>ID de Herramienta</th>
                                            <th>Nombre de Herramienta</th>
                                            <th>Estado de Herramienta</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="scanned-tools-tbody">
                                            
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <label for="observations">Observaciones:</label>
                        <textarea id="observations" name="observations"></textarea>
                        <div class="loan-buttons">
                            <button type="submit">Solicitar Préstamo</button>
                            <button type="button" onclick="cancelLoan()">Limpiar Campo</button>
                        </div>
                    </form>
                </div>

                <div class="video-container">
                    <div id="cameraOff">Camara apagada</div>
                    <video id="preview"></video>
                </div>
            </section>
        </main>
    </div>
    
    <video class="video-background" autoplay loop muted>
        <source src="Resources/Mi video.webm" type="video/webm">
    </video>

    <script src="js/scriptnavegacion.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
    <script src="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js"></script>
    <script src="js/scriptsprestamodevolucion.js"></script>
</body>

</html>
