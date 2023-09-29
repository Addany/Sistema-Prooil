<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Almacenistas</title>
<link rel="stylesheet" href="css/estilotrabajadores.css">
<link rel="stylesheet" href="css/navbar.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
</head>
<body>
    <?php
    include 'php/session.php';
    ?>
    <header>
        <!-- Barra de navegación aquí -->
    </header>
    
    <div id="page-container">
        <div id="navbar"></div>
    
        <main>
            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
                            <input type="text" id="buscador" placeholder="Nombre de la herramienta, marca, etc." oninput="buscar()">
                        </div>
                        <div class="input-group">
                            <label for="fechaInicio">Fecha de inicio:</label>
                            <input type="date" id="fechaInicio" onchange="buscar()">
                        </div>
                        <div class="input-group">
                            <label for="fechaFin">Fecha de fin:</label>
                            <input type="date" id="fechaFin" onchange="buscar()">
                        </div>
                        <div class="input-group">
                            <label for="categoria">Categoría:</label>
                            <select id="categoria" onchange="buscar()">
                                <option value="todos">Todos</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>  
                            <button type="button" onclick="resetearBusqueda()">Limpiar busqueda</button>
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
                        <th>Fecha de ingreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Estado">Activo</td>
                        <td data-label="Usuario">Root</td>
                        <td data-label="Nombre">Juan</td>
                        <td data-label="Teléfono">9211722326</td>
                        <td data-label="Correo">appdata.123@gmail.com</td>
                        <td data-label="Fecha de Ingreso">21-12-2023</td>
                        <td data-label="Acciones"><button class="accion-button" onclick="editarAlmacenista(this)">Editar</button></td>
                    </tr>
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
                    <Label>Contrasena:</Label>
                    <input type="text" id="editContrasena" placeholder="Contrasena">
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
                    <Label>Fecha:</Label>
                    <input type="date" id="editFechaIngreso" placeholder="Fecha de Ingreso">
                </div>
                
                <button type="submit" class="guardar">Guardar</button>
                <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>
            </form>
        </div>
    </div>


    <script src="js/scriptnavegacion.js"></script>
    <script src="js/ScriptsHistorialalmacenistas/tablaHistorial.js"></script>
    <script src="js/ScriptsHistorialalmacenistas/popup.js"></script>
</body>
</html>
