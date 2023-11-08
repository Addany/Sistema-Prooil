<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trabajadores/Invitados</title>
    <link rel="stylesheet" href="css/estilotrabajadores.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="icon" href="Resources/Icons/Work.ico">
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

        $sql = "
            (SELECT id_trabajador as id, nombre, foto, estado, tipo_ingreso, area_trabajo, telefono, correo, fecha_ingreso, 'Empleado' as tipo 
            FROM empleado)
            UNION ALL
            (SELECT id_invitado as id, nombre, foto, estado, tipo_ingreso, '' as area_trabajo, telefono, correo, fecha_ingreso, 'Invitado' as tipo 
            FROM invitado)
            ORDER BY fecha_ingreso DESC
            LIMIT $inicio, $cantidadPorPagina
        ";
        $result = $conexion->query($sql);$sqlTotal = "
            SELECT COUNT(*) FROM (
                SELECT id_trabajador FROM empleado
                UNION ALL
                SELECT id_invitado FROM invitado
            ) as total
        ";
        $resultadoTotal = $conexion->query($sqlTotal);
        $filaTotal = $resultadoTotal->fetch_row();
        $totalRegistros = $filaTotal[0];
        $totalPaginas = ceil($totalRegistros / $cantidadPorPagina);
        
    ?>

    <div id="page-container">
        <div id="navbar"></div>

        <main>
            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
                            <input type="text" id="buscador" placeholder="Nombre,ID y Correo" >
                        </div>
                        <div class="input-group">
                            <label for="categoria">Estado:</label>
                            <select id="categoria">
                                <option value="todos">Todos</option>
                                <option value="Activo">Activo </option>
                                <option value="Inactivo">Inactivo</option>
                            </select>  
                        </div>
                        <div class="input-group">
                            <label for="tipoRegistro">Tipo de registro:</label>
                            <select id="tipoRegistro" name="tipoRegistro">  
                                <option value="todos">Todos</option>
                                <option value="Trabajador">Trabajador</option>
                                <option value="Visitante">Visitante</option>
                                <option value="Becario">Becario</option>
                            </select>  
                        </div>
                        <div class="input-group">
                            <label for="Area">Area:</label>
                            <select id="Area">
                                <option value="todos">Todos</option>
                            </select>  
                        </div>
                        <div class="input-group">
                            <label for="Orden">Ordenar por fecha:</label>
                            <select id="Orden">
                                <option value="reciente">Más Reciente</option>
                                <option value="viejo">Más Viejo</option>
                            </select>  
                        </div>
                        <div class="button-group">
                            <button type="button" id="limpiarBtn">Limpiar Búsqueda</button>
                        </div>
                    </form>
                </div>
                <table id="tabla-trabajadores">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Estado</th>
                        <th>Tipo de Registro</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Área</th>
                        <th>Teléfono</th>
                        <th>Correo Electrónico</th>
                        <th>Fecha de Ingreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                <?php
                    if ($conexion->connect_error) {
                        die("Connection failed: " . $conexion->connect_error);
                    }
                    
                    while ($row = $result->fetch_assoc()) {
                        $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
                        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_ingreso"]);
                        $fechaFormateada = $fechaObj ? $fechaObj->format('d/m/Y') : 'N/A';
                        echo "<tr>";
                        echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto del " . htmlspecialchars($row['tipo']) . "' class='foto-trabajador'></td>";
                        if ($row["estado"] == "Activo") {
                            echo "<td data-label='Estado'><span class='estatus'><i class='fas fa-check-circle' style='color:green;'></i> Activo</span></td>";
                        } elseif ($row["estado"] == "Inactivo") {
                            echo "<td data-label='Estado'><span class='estatus'><i class='fas fa-times-circle' style='color:red;'></i> Inactivo</span></td>";
                        } else {
                            echo "<td data-label='Estado'><span class='estatus'>" . htmlspecialchars($row["estado"]) . "</span></td>";
                        }
                        echo "<td data-label='Tipo de Registro'>" . htmlspecialchars($row["tipo_ingreso"]) . "</td>";
                        echo "<td data-label='ID'>" . htmlspecialchars($row["id"]) . "</td>";
                        echo "<td data-label='Nombre'>" . htmlspecialchars($row["nombre"]) . "</td>";
                        echo "<td data-label='Area'>" . htmlspecialchars($row["area_trabajo"] ?: 'N/A') . "</td>";
                        echo "<td data-label='Teléfono'>" . htmlspecialchars($row["telefono"]) . "</td>";
                        echo "<td data-label='Correo Electrónico'>" . htmlspecialchars($row["correo"]) . "</td>";
                        echo "<td data-label='Fecha de Ingreso'>" . $fechaFormateada . "</td>";
                        echo "<td data-label='Acciones'><button class='accion-button' onclick='editarTrabajador(this)'>Editar</button></td>";
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
            </section>
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

        <div id="overlay" onclick="cerrarSiEsFuera(event, 'popupEditar')"></div>
        <div id="popupEditar">
            <form id="editarTrabajadorForm">
                <h3>Editar datos</h3>
                <div class="field">
                    <label>Estado:</label>
                    <select id="editEstado">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                
                <div class="field">
                    <label>Tipo de Registro:</label>
                    <select id="editTipoRegistro">
                        <option value="Visitante">Visitante</option>
                        <option value="Becario">Becario</option>
                        <option value="Trabajador">Trabajador</option>
                    </select>
                </div>

                <div class="field">
                    <label>Nombre:</label>
                    <input type="text" id="editNombre" placeholder="Nombre">
                </div>

                <div class="field">
                    <label>Area:</label>
                    <input type="text" id="editArea" placeholder="Area">
                </div>

                <div class="field">
                    <label>Teléfono:</label>
                    <input type="text" id="editTelefono" placeholder="Teléfono">
                </div>

                <div class="field">
                    <label>Correo Electrónico:</label>
                    <input type="email" id="editCorreo" placeholder="Correo Electrónico">
                </div>
                <div class="button-group">
                    <button type="submit" class="guardar">Guardar</button>
                    <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <script src="js/scriptnavegacion.js"></script>
    <script src="js/tablaHistorial.js"></script>
    <script src="js/popup.js"></script>
    <script src="js/prueba2.js"></script>
</body>
</html>