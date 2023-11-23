<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de entregas de EPP</title>
    <link rel="stylesheet" href="css/estilohistorialentregas.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="icon" href="Resources/Icons/Manos.ico">
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
        <main>

            <div id="navbar"></div>

            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
                            <input type="text" id="buscador" placeholder="Trabajador Solicitante, Folio, etc.">
                        </div>
                        <div class="input-group">
                            <label for="fechaInicio">Fecha inicio:</label>
                            <input type="date" id="fechaInicio" onchange="buscar()">
                        </div>
                        <div class="input-group">
                            <label for="fechaFin">Fecha final:</label>
                            <input type="date" id="fechaFin" onchange="buscar()">
                        </div>
                        <div class="input-group">
                            <label for="categoria">Categoría:</label>
                            <select id="categoria" onchange="buscar()">
                                <option value="todos">Todos</option>
                                <option value="Concretado">Concretado</option>
                                <option value="No concretado">No concretado</option>
                            </select>
                        </div>
                        <div class="button-group"  id="filter">
                            <button type="button" id="generarReporte"  onclick="verGenerarReporte(this)">Generar Reporte</button>
                            <button type="button" id="eliminarBusqueda">Limpiar Búsqueda</button>
                        </div>
                    </form>
                </div>
                <table id="tabla-historial">
                    <thead>
                        <tr>
                            <th>Folio</th>
                            <th>Fecha de Transacción</th>
                            <th>Trabajador Solicitante</th>
                            <th>Almacenista que Autoriza</th>
                            <th>Observaciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        if ($conexion->connect_error) {
                            die();
                        }
                        $sql="SELECT historial_epp.*, folio_epp.*, cantidad_epp.*,
                        CASE
                        WHEN historial_epp.id_trabajador IS NOT NULL THEN empleado.nombre
                        WHEN historial_epp.id_invitado IS NOT NULL THEN invitado.nombre
                        END AS nombre_persona
                        FROM historial_epp
                        JOIN cantidad_epp ON historial_epp.identificador = cantidad_epp.identificador
                        JOIN folio_epp ON historial_epp.no_folio = folio_epp.no_folio
                        LEFT JOIN empleado ON historial_epp.id_trabajador = empleado.id_trabajador
                        LEFT JOIN invitado ON historial_epp.id_invitado = invitado.id_invitado
                        GROUP BY folio_epp.no_folio
                        ORDER BY folio_epp.no_folio";
                        $result = $conexion->query($sql);
                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $fechaObj = date_create_from_format('Y-m-d', $row["fecha_transaccion"]);
                                $fechaFormateada = $fechaObj ? $fechaObj->format('d/m/Y') : 'N/A';
                                echo "<tr>";
                                echo "<td data-label='Folio'>" . $row["no_folio"] . "</td>";
                                echo "<td data-label='Fecha de Transacción'>" . $fechaFormateada . "</td>";
                                echo "<td data-label='Trabajador solicitante'>" . $row["nombre_persona"] . "</td>";
                                echo "<td data-label='Almacenista que Autoriza'>" . $row["usuario"] . "</td>";
                                echo "<td data-label='Observaciones'>" . $row["observacion"] . "</td>";
                                echo "<td>";
                                //TODO
                                //VER DATOS AGREGAR ID y su respectiva funcion
                                echo "<button class='accion-button' onclick='verDatos(" . $row["no_folio"] . ")'>Ver</button>";
                                echo "<button class='accion-button'>Generar documento</button>";
                                echo "</td>";
                                echo "</tr>";
                            }
                        }
                        ?>
                    </tbody>
                </table>
            </section>
        </main>

        <div id="overlay" onclick="cerrarSiEsFuera(event, 'popupVer')"></div>
        <div id="popupVer" class="popup">
            <form id="verEntregaForm"> 
                <h3>Detalles de la entrega</h3>
                <label id="folio_numero"></label>
                <label>Lista de EPP:</label>
                <div class="table-container">
                    <table id="listaEPP">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Modelo</th>
                                <th>Marca</th>
                                <th>Clase</th>
                                <th>Talla de EPP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Nombre">Vi</td>
                                <td data-label="Modelo">Va</td>
                                <td data-label="Marca">Tlal</td>
                                <td data-label="Clase">Pan</td>
                                <td data-label="Talla de EPP">xd</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="button-group">
                    <button type="button" onclick="cerrarPopup('popupVer')">Cerrar</button> 
                </div>
            </form>
        </div>

        <div id="popupReporte" class="popup">
            <form id="generarReporteForm"> 
                <h3>Generar Reporte</h3>
                
                <div class="input-group">
                    <div class="input-container">
                        <label for="anioReporte">Selecciona el año:</label>
                        <select id="anioReporte" name="anioReporte">
                            <?php for($i = 2000; $i <= 2050; $i++): ?>
                                <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                            <?php endfor; ?>
                        </select>
                    </div>
    
                    <div class="input-container">
                        <label for="mesReporte">Selecciona el mes:</label>
                        <select id="mesReporte" name="mesReporte">
                            <option value="" selected>Todo el año</option>
                            <?php for($i = 1; $i <= 12; $i++): ?>
                                <option value="<?php echo str_pad($i, 2, '0', STR_PAD_LEFT); ?>">
                                    <?php echo date('F', mktime(0, 0, 0, $i, 10)); ?>
                                </option>
                            <?php endfor; ?>
                        </select>
                    </div>
                </div>
                <div class="button-group">
                    <button type="button" onclick="generarReporte()">Generar Reporte</button>
                    <button type="button" onclick="cerrarPopup('popupReporte')">Cerrar</button>
                </div>
            </form>
        </div>


    <script src="js/scriptnavegacion.js"></script>
    <!--<script src="js/tablaHistorial.js"></script>-->
    <script src="js/popup.js"></script>
    <script src="js/moduleDeliveryEPP/detallesPrestamo.js"></script>

</body>
</html>
