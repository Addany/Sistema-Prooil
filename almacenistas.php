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
                            <label for="fechaInicio">Fecha de inicio:</label>
                            <input type="date" id="fechaInicio">
                        </div>
                        <div class="input-group">
                            <label for="fechaFin">Fecha de fin:</label>
                            <input type="date" id="fechaFin">
                        </div>
                        <div class="input-group">
                            <label for="categoria">Categoría:</label>
                            <select id="categoria">
                                <option value="todos">Todos</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>  
                            <button type="button" id="limpiarBusqueda">Limpiar Búsqueda</button>
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
                        $sql = "SELECT * FROM almacenista";
                        $result = $conexion->query($sql);

                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                echo "<tr>";
                                echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
                                echo "<td data-label='Usuario'>" . $row["usuario"] . "</td>";
                                echo "<td data-label='Nombre'>" . $row["nombre"] . "</td>";
                                echo "<td data-label='Teléfono'>" . $row["telefono"] . "</td>";
                                echo "<td data-label='Correo'>" . $row["correo"] . "</td>";
                                echo "<td data-label='Fecha de Ingreso'>" . $row["fecha_ingreso"] . "</td>";
                                echo "<td data-label='Acciones'><button class='accion-button' onclick='editarAlmacenista(this)'>Editar</button></td>";
                                echo "</tr>";
                            }
                        }
                        ?>
                    </tbody>
                </table>
            </section>
        </main>
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
                    <Label>Usuario:</Label>
                    <input type="text" id="editID" placeholder="ID">
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

                <div class="field">
                    <Label>Fecha de Ingreso:</Label>
                    <input type="date" id="editFechaIngreso" placeholder="Fecha de Ingreso">
                </div>
                
                <button type="submit" class="guardar">Guardar</button>
                <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>
            </form>
        </div>
    </div>


    <script src="js/scriptnavegacion.js"></script>
    <script src="js/tablaHistorial.js"></script>
    <script src="js/popup.js"></script>
    <script src="js/prueba.js"></script>
</body>
</html>
