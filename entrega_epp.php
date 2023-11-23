<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Entrega de Equipo EPP</title>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="css/estilosentregaEPP.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/modalEPP/numberFolio.css">
    <link rel="icon" href="Resources/Icons/Manos.ico">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>

<body>
    <?php
    include 'php/session.php';
    include 'php/conexion_bd.php';
    ?>
    <header>
        
    </header>

    <div id="page-container">
        <main>
            <div id="navbar"></div>

            <section class="container">
                <div class="form-container">
                    <h3>Formulario de Entrega de Equipo EPP</h3>
                    <?php
                    $queryepp = "SELECT epp_tipo.id_epp, epp_tipo.identificador, epp.nombre_epp, 
                    cantidad_epp.marca, cantidad_epp.modelo,
                    cantidad_epp.cantidad AS total_cantidad, 
                    COALESCE(SUM(historial_epp.cantidad), 0) AS cantidad_entregada, 
                    (cantidad_epp.cantidad - COALESCE(SUM(historial_epp.cantidad), 0)) AS cantidad_disponible
                    FROM epp_tipo
                    JOIN cantidad_epp ON epp_tipo.identificador = cantidad_epp.identificador
                    JOIN epp ON epp_tipo.id_epp = epp.id_epp
                    LEFT JOIN historial_epp ON cantidad_epp.identificador = historial_epp.identificador
                    GROUP BY epp_tipo.id_epp, epp_tipo.identificador, cantidad_epp.marca, cantidad_epp.modelo
                    HAVING (cantidad_epp.cantidad - COALESCE(SUM(historial_epp.cantidad), 0)) > 0";
                    $resultepp = mysqli_query($conexion, $queryepp);
                    $options = "<option id='firstElement' value=''>Selecciona un EPP</option>";
                    while($row = mysqli_fetch_assoc($resultepp)) {
                        $identificador = $row['identificador'];
                        $nombre = $row['nombre_epp'];
                        $marca = $row['marca'];
                        if ($marca == "") {
                            $marca = "N/A";
                        }
                        $modelo = $row['modelo'];
                        $disponible = $row['cantidad_disponible'];
                        $options .= "<option value='$identificador'>$identificador - $nombre - $marca - $modelo - Disponible: $disponible </option>";
                    }
                    $queryEmpleado = "SELECT id_trabajador, nombre FROM empleado";
                    $resultEmpleado = mysqli_query($conexion, $queryEmpleado);

                    //Muestra una lista desplegable con los nombres de los empleados
                    $options1 = "<option id='secondElement' value=''>Selecciona una persona</option>";
                    while($row = mysqli_fetch_assoc($resultEmpleado)) {
                        $id = $row['id_trabajador'];
                        $nombre = $row['nombre'];
                        $options1 .= "<option value='e_$id'>Empleado: $id - $nombre</option>";
                    }
                    //Muestra una lista desplegable con los nombres de los invitados
                    $queryInvitado = "SELECT id_invitado, nombre FROM invitado";
                    $resultInvitado = mysqli_query($conexion, $queryInvitado);
                    while($row = mysqli_fetch_assoc($resultInvitado)) {
                        $id = $row['id_invitado'];
                        $nombre = $row['nombre'];
                        $options1 .= "<option value='i_$id'>Invitado: $id - $nombre</option>";
                    }
                    ?>
                    <form id="deliveryForm">
                        <label for="almacenName">Almacenista en Solicitud: <span id="nameStorer"><?php echo "$almacenista";?></span></label>
                        <br>
                        <label for="eppList">Selecciona el EPP:</label>
                        <select id="eppList" class="eppList" required>
                            <?php echo $options; ?>
                        </select>
                        <label for="eppList">Selecciona el Trabajador:</label>
                        <select id="personSelect" class="" required>
                            <?php echo $options1; ?>
                        </select>
                        <div class="selected-epp">
                            <br>
                            <Label>EPP Seleccionados:</Label>
                            <div id="tableContainer" class="table-container">
                                <table id="selected-epp-table">
                                    <thead>
                                        <tr>
                                            <th>Cantida disponible</th>
                                            <th>Nombre de EPP</th>
                                            <th>Clase</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Talla</th>
                                            <th>Epp solicitados</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="render-elements-tool">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <label for="observations">Observaciones:</label>
                        <textarea id="observations"></textarea>

                        <div class="delivery-buttons">
                            <button type="button" id="confirmData">Solicitar Entrega</button>
                            <button type="button" id="deleteData">Borrar campo</button>
                        </div>
                    </form>
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
    <script type="module" src="js/moduleDeliveryEPP/index.js"></script>
</body>

</html>
