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
    ?>

    <div id="page-container">
        <div id="navbar"></div>

        <main>
            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
                            <input type="text" id="buscador" placeholder="Nombre,teléfono,etc." >
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
                                <option value="Activo">Activo </option>
                                <option value="Inactivo">Inactivo</option>
                            </select>  
                        </div>
                        <div class="input-group">
                            <button type="button">Limpiar Búsqueda</button>
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
                        die();
                    }
                    $sql = "SELECT * FROM empleado";
                    $sql2 = "SELECT * FROM invitado";
                    $result2 = $conexion->query($sql2);
                    $result = $conexion->query($sql);

                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
                            echo "<tr>";
                            echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto del empleado' class='foto-trabajador'></td>";
                            echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
                            echo "<td data-label='Tipo de Registro'>" . $row["tipo_ingreso"] . "</td>";
                            echo "<td data-label='ID'>" . $row["id_trabajador"] . "</td>";
                            echo "<td data-label='Nombre'>" . $row["nombre"] . "</td>";
                            echo "<td data-label='Area'>" . $row["area_trabajo"] . "</td>";
                            echo "<td data-label='Teléfono'>" . $row["telefono"] . "</td>";
                            echo "<td data-label='Correo Electrónico'>" . $row["correo"] . "</td>";
                            echo "<td data-label='Fecha de Ingreso'>" . $row["fecha_ingreso"] . "</td>";
                            echo "<td data-label='Acciones'><button class='accion-button' onclick='editarTrabajador(this)'>Editar</button></td>";
                            echo "</tr>";
                        }
                    }
                    if ($result2->num_rows > 0) {
                        while ($row = $result2->fetch_assoc()) {
                            $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
                            echo "<tr>";
                            echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto del invitado' class='foto-trabajador'></td>";
                            echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
                            echo "<td data-label='Tipo de Registro'>" . $row["tipo_ingreso"] . "</td>";
                            echo "<td data-label='ID'>" . $row["id_invitado"] . "</td>";
                            echo "<td data-label='Nombre'>" . $row["nombre"] . "</td>";
                            echo "<td data-label='Area'>N/A</td>";
                            echo "<td data-label='Teléfono'>" . $row["telefono"] . "</td>";
                            echo "<td data-label='Correo Electrónico'>" . $row["correo"] . "</td>";
                            echo "<td data-label='Fecha de Ingreso'>" . $row["fecha_ingreso"] . "</td>";
                            echo "<td data-label='Acciones'><button class='accion-button' onclick='editarTrabajador(this)'>Editar</button></td>";
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
                
                <button type="submit" class="guardar">Guardar</button>
                <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>
            </form>
        </div>
    </div>
    <script src="js/scriptnavegacion.js"></script>
    <script src="js/tablaHistorial.js"></script>
    <script src="js/popup.js"></script>
    <script src="js/prueba2.js"></script>
</body>
</html>
