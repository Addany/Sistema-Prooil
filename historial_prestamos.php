<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de préstamos</title>
    <link rel="stylesheet" href="css/estilohistorial.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="icon" href="Resources/Icons/Manos.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
</head>
<body>
    <?php
    include 'php/session.php';
    include 'php/conexion_bd.php';

    $pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
    $cantidadPorPagina = 20;
    $inicio = ($pagina > 1) ? ($pagina * $cantidadPorPagina) - $cantidadPorPagina : 0;

    $sql_total_prestamos = "
        SELECT COUNT(DISTINCT folio_prestamo.no_folio) as total 
        FROM historial_herramienta 
        JOIN folio_prestamo ON historial_herramienta.no_folio = folio_prestamo.no_folio
        LEFT JOIN empleado ON historial_herramienta.id_trabajador = empleado.id_trabajador
        LEFT JOIN invitado ON historial_herramienta.id_invitado = invitado.id_invitado
        JOIN almacenista ON historial_herramienta.usuario = almacenista.usuario
    ";
    $resultado_total_prestamos = $conexion->query($sql_total_prestamos);
    $fila_total_prestamos = $resultado_total_prestamos->fetch_assoc();
    $totalRegistros = $fila_total_prestamos['total'];

    $totalPaginas = ceil($totalRegistros / $cantidadPorPagina);
    ?>

    <main>
        <div id="page-container">
            <div id="navbar"></div>
            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar:</label>
                            <input type="text" id="buscador" placeholder="Nombre del Trabajador, Folio, etc.">
                        </div>
                        <div class="input-group">
                            <label for="fechaInicio">Fecha inicio:</label>
                            <input type="date" id="fechaInicio">
                        </div>
                        <div class="input-group">
                            <label for="fechaFin">Fecha final:</label>
                            <input type="date" id="fechaFin">
                        </div>
                        <div class="input-group">
                            <label for="status">Status:</label>
                            <select id="status">
                                <option value="todos">Todos</option>
                                <option value="concretado">Concretado</option>
                                <option value="activo">Activo</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="almacenista">Almacenista:</label>
                            <select id="almacenista" name="almacenista">
                                <option value="todos">Todos</option>
                                <!-- Las opciones se llenarán dinámicamente usando JavaScript -->
                            </select>
                        </div>
                        <div class="button-group"  id="filter">
                            <button type="button" id="generarReporte"  onclick="verGenerarReporte(this)">Generar Reporte</button>
                            <button type="button" id="eliminarBusqueda">Limpiar Búsqueda</button>
                        </div>
                    </form>
                </div>
                <div class="tabla-contenedor">
                    <table id="tabla-historial">
                        <thead>
                            <tr>
                                <th>Folio</th>
                                <th>Nombre del Trabajador</th>
                                <th>Fecha de Transacción</th>
                                <th>Fecha de Devolución</th>
                                <th>Almacenista que Autoriza</th>
                                <th>Observaciones</th>
                                <th>Status del prestamo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            if ($conexion->connect_error) {
                                die();
                            }

                            $sql = "
                            SELECT historial_herramienta.*, folio_prestamo.*, GROUP_CONCAT(historial_herramienta.identificador) AS identificadores,
                            CASE
                                WHEN historial_herramienta.id_trabajador IS NOT NULL THEN empleado.nombre
                                WHEN historial_herramienta.id_invitado IS NOT NULL THEN invitado.nombre
                            END AS nombre_persona,
                            almacenista.nombre AS nombre_almacenista
                            FROM historial_herramienta
                            JOIN folio_prestamo ON historial_herramienta.no_folio = folio_prestamo.no_folio
                            LEFT JOIN empleado ON historial_herramienta.id_trabajador = empleado.id_trabajador
                            LEFT JOIN invitado ON historial_herramienta.id_invitado = invitado.id_invitado
                            JOIN almacenista ON historial_herramienta.usuario = almacenista.usuario
                            GROUP BY folio_prestamo.no_folio
                            ORDER BY folio_prestamo.fecha_transaccion DESC
                            LIMIT $cantidadPorPagina OFFSET $inicio
                            ";
                            $result = $conexion->query($sql);
                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    $fechaObj = date_create_from_format('Y-m-d', $row["fecha_transaccion"]);
                                    $transaccion = $fechaObj->format('d/m/Y');
                                    $fechaObj1 = null;
                                    $devolucion = '';
                                    if(isset($row["fecha_devolucion"]) && !is_null($row["fecha_devolucion"]) && $row["fecha_devolucion"] != '') {
                                        $fechaObj1 = date_create_from_format('Y-m-d', $row["fecha_devolucion"]);
                                        $devolucion = $fechaObj1->format('d/m/Y');
                                    }
                                    echo "<tr>";
                                    echo "<td data-label='Folio'>" . $row["no_folio"] . "</td>";
                                    echo "<td data-label='Nombre del Trabajador'>" . $row["nombre_persona"] . "</td>";
                                    echo "<td data-label='Fecha de Transacción'>" . $transaccion . "</td>";
                                    echo "<td data-label='Fecha de Devolución'>" . $devolucion . "</td>";
                                    echo "<td data-label='Quien Autorizó'>" . $row["nombre_almacenista"] . "</td>";
                                    echo "<td data-label='Observaciones'>" . $row["observacion"] . "</td>";
                                    if ($row["estado"] == "Activo") {
                                        echo "<td data-label='Estado'><i class='fa-solid fa-handshake' style='color:red;'></i> Activo</td>";
                                    } else if ($row["estado"] == "Concretado") {
                                        echo "<td data-label='Estado'><i class='fas fa-check-circle' style='color:green;'></i> Concretado</td>";
                                    } else {
                                        echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
                                    }

                                    echo "<td data-label='Acciones'>";
                                    echo "<div class='botones-flex'>";
                                    echo "<button class='accion-button' onclick='verDetalles(" . $row["no_folio"] . ")'>Ver</button>";
                                    echo "<button class='accion-button'>Generar documento</button>";
                                    echo "</div>";
                                    echo "</td>";
                                    echo "</tr>";
                                }
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </main>

        <div class="pagination">
            <?php
            $range = 5; 
            $start = max(1, $pagina - floor($range / 2)); 
            $end = min($totalPaginas, $start + $range - 1); 

            $start = max(1, $end - $range + 1);
            ?>

            <?php if($pagina > 1): ?>  
                <a class="prev" href="?pagina=<?php echo $pagina-1; ?>">Anterior</a>
            <?php endif; ?>

            <?php for($i = $start; $i <= $end; $i++): ?>
                <?php if($i == $pagina): ?>
                    <span class="current-page"><?php echo $i; ?></span> 
                <?php else: ?>
                    <a href="?pagina=<?php echo $i; ?>"><?php echo $i; ?></a>
                <?php endif; ?>
            <?php endfor; ?>

            <?php if($pagina < $totalPaginas): ?>  
                <a class="next" href="?pagina=<?php echo $pagina+1; ?>">Siguiente</a>
            <?php endif; ?>
        </div>

    <div id="overlay" onclick="cerrarSiEsFuera(event,'popupVer')"></div>
    <div id="popupVer" class="popup">
        <form id="verPrestamoForm"> 
            <h3>Detalles del Préstamo</h3>
            <label id="folio_numero"></label>
            <label>Herramientas Prestadas:</label>
            <div class="table-container">
                <table id="listaHerramientas">
                    <thead>
                        <tr>
                            <th>Checklist</th>
                            <th>Nombre</th>
                            <th>ID</th>
                            <th>N.de Serie</th>
                            <th>Marca</th>
                            <th>Fecha de Devolución</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Seleccion de entrega"><input type="checkbox"></td>
                            <td data-label="ID de herramienta"></td>
                            <td data-label="Tipo de herramienta"></td>
                            <td data-label="N. Serie"></td>
                            <td data-label="Marca"></td>
                            <td data-label="Fecha de devolución"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <label for="observaciones">Observaciones:</label>
            <textarea id="observaciones" disabled></textarea>
            <div class="button-group">
                <button type="button" id="botonEnviar">Guardar</button> 
                <button type="button" onclick="cerrarPopup('popupVer')">Cancelar</button> 
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
    </div>

    <script src="js/scriptnavegacion.js"></script>
    <script src="js/tablaHistorial.js"></script>
    <script src="js/popup.js"></script>
    <script src="js/prueba4.js"></script>
    <script src="js/renderModule/detallesPrestamo.js"></script>
    <script src="js/renderModule/marcarHerramienta.js"></script>

</body>
</html>
