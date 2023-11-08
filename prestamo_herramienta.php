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
    <link rel="stylesheet" href="css/container-windowFolio.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body>
    <?php
    include 'php/session.php';
    include 'php/conexion_bd.php';
    ?>
    <header>
        
    </header>


    <div id="page-container">
        <div id="navbar"></div>

        <main>
            <section class="container">
                <div class="form-container">
                    <!-- Esta es la venta emergente que muestra la informacion del solicitante -->
                    <h3>Formulario de Préstamo</h3>

                    <?php
                    $queryEmpleado = "SELECT id_trabajador, nombre FROM empleado";
                    $resultEmpleado = mysqli_query($conexion, $queryEmpleado);

                    //Muestra una lista desplegable con los nombres de los empleados
                    $options = "<option id='one-elements' value=''>Selecciona una persona</option>";
                    while($row = mysqli_fetch_assoc($resultEmpleado)) {
                        $id = $row['id_trabajador'];
                        $nombre = $row['nombre'];
                        $options .= "<option value='e_$id'>Empleado: $id - $nombre</option>";
                    }
                    //Muestra una lista desplegable con los nombres de los invitados
                    $queryInvitado = "SELECT id_invitado, nombre FROM invitado";
                    $resultInvitado = mysqli_query($conexion, $queryInvitado);
                    while($row = mysqli_fetch_assoc($resultInvitado)) {
                        $id = $row['id_invitado'];
                        $nombre = $row['nombre'];
                        $options .= "<option value='i_$id'>Invitado: $id - $nombre</option>";
                    }
                    ?>

                    <div id="loanForm">
                        <!-- Es el nombre de la persona que autoriza el prestamo -->
                        <label for="almacenName">Almacenista en Solicitud: <strong id="nameAlmacenista"><?php echo "$almacenista";?></strong></label>
                        <br> <!-- Colocar br para saltos de linea es mala practica, para eso tienes css -->
                        <label id="selectWorkerName" for="workerName">Nombre del Trabajador:</label>
                        <select id="workerName" class="workerName" name="petitioner" required>
                            <?php echo $options; ?>
                        </select>
                        <!-- Contenedor de las herramientas escaneadas -->

                        <div class="container-renderTable">
                            <table>
                                <tr>
                                    <th>
                                        ID de la herramienta
                                    </th>
                                    <th>
                                        Nombre de la herramienta
                                    </th>
                                    <th>
                                        Estado de la herramienta
                                    </th>
                                    <th>
                                        Acciones
                                </th>
                                </tr>
                            </table>
                            <table id="renderTable">    
                                <div id="container-elementTR">
                                    
                                </div>
                            </table>
                        </div>

                        <label for="observations">Observaciones:</label>
                        <textarea id="observations" name="observations"></textarea>
                        <div class="loan-buttons">
                            <button id='confirmData'>Solicitar Préstamo</button>
                            <button type="button" id="clearField">Limpiar campo</button>
                        </div>
                    </div>
                </div>

                <div class="video-container">
                    <video id="preview"></video>
                </div>
            </section>
        </main>
    </div>
    
    <video class="video-background" autoplay loop muted>
        <source src="Resources/Mi video.webm" type="video/webm">
    </video>

    <script src="js/scriptnavegacion.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
    <script src="js/libraries/instascan.min.js"></script>
    <script src="js/libraries/jquery.min.js"></script>
    <script type="module" src="js/renderModule/scanCamera.js"></script>
    <!-- <script type ="module" src="js/scriptsprestamodevolucion.js" defer></script> -->
    <script type="module" src="js/renderModule/renderTable.js" defer></script>
    <script type="module" src="js/renderModule/renderDelete.js"></script>
    <script type="module" src="js/renderModule/deliver.information.js"></script>

    <?php
        //Aquí estoy recibiendo los datos en formato JSON desde la solicitud 
        $data_JSON = file_get_contents('php://input');

        $new_data = json_decode($data_JSON, true);

        print_r($new_data)
    ?>
</body>
</html>