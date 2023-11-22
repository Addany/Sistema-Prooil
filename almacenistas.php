<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Almacenistas</title>
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

    $sql_total_almacenista = "SELECT COUNT(*) as total FROM almacenista";
    $resultado_total_almacenista = $conexion->query($sql_total_almacenista);
    $fila_total_almacenista = $resultado_total_almacenista->fetch_assoc();
    $totalRegistros = $fila_total_almacenista['total'];

    $totalPaginas = ceil($totalRegistros / $cantidadPorPagina);
    ?>
    <header>
        
    </header>
    
    <div id="page-container">
        <div id="navbar"></div>
    
        <main>
            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
                            <input type="text" id="buscador" placeholder="Nombre, Usuario, etc.">
                        </div>
                        <div class="input-group">
                            <label for="Orden">Ordenar por fecha:</label>
                            <select id="Orden">
                                <option value="reciente">Más Reciente</option>
                                <option value="viejo">Más Viejo</option>
                            </select>  
                        </div>
                        <div class="input-group">
                            <label for="categoria">Estado:</label>
                            <select id="categoria">
                                <option value="todos">Todos</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select> 
                        </div> 
                        <div class="button-group">
                            <button type="button" id="limpiarBtn">Limpiar Búsqueda</button>
                        </div>
                    </form>
                </div>
                <table id="tabla-almacenistas">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Fecha de Ingreso</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        if ($conexion->connect_error) {
                            die();
                        }
                        $orden = isset($_GET['orden']) ? $_GET['orden'] : 'reciente';
                        if ($orden == 'reciente') {
                            $sql = "SELECT * FROM almacenista ORDER BY fecha_ingreso DESC LIMIT $inicio, $cantidadPorPagina";
                        } else {
                            $sql = "SELECT * FROM almacenista ORDER BY fecha_ingreso ASC LIMIT $inicio, $cantidadPorPagina";
                        }
                        $result = $conexion->query($sql);
    
                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $fechaObj = date_create_from_format('Y-m-d', $row["fecha_ingreso"]);
                                $fechaFormateada = $fechaObj->format('d/m/Y');
                                echo "<tr>";
                                if ($row["estado"] == "Activo") {
                                    echo "<td data-label='Estado'><span class='estatus'><i class='fas fa-check-circle' style='color:green;'></i> " . $row["estado"] . "</span></td>";
                                } elseif ($row["estado"] == "Inactivo") {
                                    echo "<td data-label='Estado'><span class='estatus'><i class='fas fa-times-circle' style='color:red;'></i> " . $row["estado"] . "</span></td>";
                                } else {
                                    echo "<td data-label='Estado'><span class='estatus'>" . $row["estado"] . "</span></td>";
                                }                            
                                echo "<td data-label='Usuario'>" . $row["usuario"] . "</td>";
                                echo "<td data-label='Nombre'>" . $row["nombre"] . "</td>";
                                echo "<td data-label='Teléfono'>" . $row["telefono"] . "</td>";
                                echo "<td data-label='Correo'>" . $row["correo"] . "</td>";
                                echo "<td data-label='Fecha de Ingreso'>" . $fechaFormateada . "</td>";
                                echo "<div class='botones-flex'>";
                                echo "<td data-label='Acciones'><button class='accion-button' onclick='editarAlmacenista(this)'>Editar</button></td>";
                                echo "</div>";
                                echo "</tr>";
                            }
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
            <form id="editarAlmacenistaForm">
                <h3>Editar datos</h3>
                
                <div class="field">
                    <Label>Estado:</Label>
                    <select id="editEstado">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>

                <div class="field">
                    <Label>Nombre:</Label>
                    <input type="text" id="editNombre" placeholder="Nombre">
                </div>

                <div class="field">
                    <Label>Contraseña:</Label>
                    <input type="text" id="editContrasena" placeholder="Contraseña">
                </div>

                <div class="field">
                    <Label>Teléfono:</Label>
                    <input type="text" id="editTelefono" placeholder="Teléfono">
                </div>

                <div class="field">
                    <Label>Correo:</Label>
                    <input type="email" id="editCorreo" placeholder="Correo Electrónico">
                </div>
                <div class="button-group">
                    <button type="submit" class="guardar">Guardar</button>
                    <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>
                <div></div>
            </form>
        </div>
    </div>

    <script src="js/scriptnavegacion.js"></script>
    <script src="js/tablaHistorial.js"></script>
    <script src="js/popup.js"></script>
    <script src="js/prueba.js"></script>
</body>
</html>
