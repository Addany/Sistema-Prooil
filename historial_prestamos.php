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
    ?>

    <main>
        <div id="page-container">
            <div id="navbar"></div>
            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
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
                            <label for="categoria">Categoría:</label>
                            <select id="categoria">
                                <option value="todos">Todos</option>
                                <option value="Concretado">Concretado</option>
                                <option value="No concretado">No concretado</option>
                            </select>
                            <button type="button">Limpiar Búsqueda</button>
                        </div>
                    </form>
                </div>
                <table id="tabla-historial">
                    <thead>
                        <tr>
                            <th>Folio</th>
                            <th>Nombre del Trabajador</th>
                            <th>Fecha de Transacción</th>
                            <th>Fecha de Devolución</th>
                            <th>¿Quien Autorizó?</th>
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

                        $sql = "SELECT historial_herramienta.*, folio_prestamo.*,GROUP_CONCAT(historial_herramienta.identificador) AS identificadores,
                        CASE
                        WHEN historial_herramienta.id_trabajador IS NOT NULL THEN empleado.nombre
                        WHEN historial_herramienta.id_invitado IS NOT NULL THEN invitado.nombre
                        END AS nombre_persona,
                        almacenista.nombre AS nombre_almacenista
                        FROM historial_herramienta
                        JOIN folio_prestamo
                        ON historial_herramienta.no_folio = folio_prestamo.no_folio
                        LEFT JOIN empleado
                        ON historial_herramienta.id_trabajador = empleado.id_trabajador
                        LEFT JOIN invitado
                        ON historial_herramienta.id_invitado = invitado.id_invitado
                        JOIN almacenista
                        ON historial_herramienta.usuario = almacenista.usuario
                        GROUP BY 
                        folio_prestamo.no_folio;
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
                                echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
                                echo "<td data-label='Acciones'>";
                                echo "<button class='accion-button' onclick='verDetalles(" . $row["no_folio"] . ")'>Ver</button>";
                                echo "<button class='accion-button'>Generar documento</button>";
                                echo "</td>";
                                echo "</tr>";
                            }
                        }
                        ?>
                    </tbody>
                </table>
            </section>
        </div>
    </main>

    <div id="overlay" onclick="cerrarSiEsFuera(event, 'popupEditar', 'popupVer')"></div>
    <div id="popupEditar">
        <form id="editarPrestamoForm"> 
            <h3>Editar datos</h3>
            
            <div class="field">
                <label for="editFolio">Folio:</label>
                <input type="text" id="editFolio" placeholder="Folio" readonly>
            </div>

            <div class="field">
                <label for="editNombreDelTrabajador">Nombre del Trabajador:</label>
                <input type="text" id="editNombreDelTrabajador" placeholder="Nombre del Trabajador">
            </div>

            <div class="field">
                <label for="editFechaTransaccion">Fecha de Transacción:</label>
                <input type="date" id="editFechaTransaccion">
            </div>

            <div class="field">
                <label for="editFechaDevolucion">Fecha de Devolución:</label>
                <input type="date" id="editFechaDevolucion" placeholder="Fecha de Devolución">
            </div>

            <div class="field">
                <label for="editQuienAutorizo">¿Quién Autorizó?:</label>
                <select id="editQuienAutorizo">
                    <option value="Persona 1">Persona 1</option>
                    <option value="Persona 2">Persona 2</option>
                </select>
            </div>

            <div class="field">
                <label for="editestado">Status del prestamo:</label>
                <select id="editestado">
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                </select>
            </div>

            <button type="submit" class="guardar">Guardar</button>
            <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>  
        </form>
    </div>

    <div id="popupVer" class="popup">
        <form id="verPrestamoForm"> 
            <h3>Detalles del Préstamo</h3>
            <label id="folio_numero"></label>
            <label>Herramientas Prestadas:</label>
            <div class="table-container">
                <table id="listaHerramientas">
                    <thead>
                        <tr>
                            <th>Marcar como entregado</th>
                            <th>Nombre</th>
                            <th>ID</th>
                            <th>Número de Serie</th>
                            <th>Marca</th>
                            <th>Fecha de devolución</th>
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
                <button type="button">Guardar</button> 
                <button type="button" onclick="cerrarPopup('popupVer')">Cancelar</button> 
            </div> 
        </form>
    </div>

    <script src="js/scriptnavegacion.js"></script>
    <script src="js/tablaHistorial.js"></script>
    <script src="js/popup.js"></script>
    <script src="js/renderModule/detallesPrestamo.js"></script>

</body>
</html>
