<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Préstamos y Devoluciones</title>
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
                                <option value="Alta">Alta</option>
                                <option value="Baja">Baja</option>
                            </select>  
                        </div>
                        <div class="input-group">
                            <button type="button" onclick="resetearBusqueda()">Limpiar busqueda</button>
                        </div>
                    </form>
                </div>
                <table id="tabla-trabajadores">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Estado</th>
                        <th>Tipo de registro</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo Electrónico</th>
                        <th>Área de Trabajo</th>
                        <th>Fecha de Ingreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Foto"><img src="Resources/Imagen1.webp" alt="Foto de daniel" class="foto-trabajador"></td>
                        <td data-label="Estado">Alta</td>
                        <td data-label="Tipo de Registro">Trabajador</td>
                        <td data-label="ID">19939</td>
                        <td data-label="Nombre">Juan</td>
                        <td data-label="Teléfono">9211722326</td>
                        <td data-label="Correo Electrónico">appdata.123@gmail.com</td>
                        <td data-label="Área de Trabajo">Almacen</td>
                        <td data-label="Fecha de Ingreso">08-12-2022</td>
                        <td data-label="Acciones">
                            <button class="accion-button" onclick="editarTrabajador(this)">Editar</button>
                    </tr>
                </tbody>
            </table>
            </section>
        </main>
        <div id="overlay"></div>
        <div id="popupEditar">
            <form id="editarTrabajadorForm">
                <h3>Editar datos</h3>
                <div class="field">
                    <Label>Foto:</Label>
                    <img id="editFoto" src="" >
                    <input type="file" id="editFotoInput" onchange="actualizarFoto(event)">
                </div>
                <div class="field">
                    <Label>Estado:</Label>
                    <select id="editEstado">
                        <option value="Alta">Alta</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>
                
                <div class="field">
                    <Label>Tipo:</Label>
                    <select id="editTipoRegistro">
                        <option value="Trabajador">Trabajador</option>
                        <option value="Invitado">Invitado</option>
                    </select>
                </div>

                <div class="field">
                    <Label>ID:</Label>
                    <input type="text" id="editID" placeholder="ID">
                </div>

                <div class="field">
                    <Label>Nombre:</Label>
                    <input type="text" id="editNombre" placeholder="Nombre">
                </div>

                <div class="field">
                    <Label>Telefono:</Label>
                    <input type="text" id="editTelefono" placeholder="Teléfono">
                </div>

                <div class="field">
                    <Label>Correo:</Label>
                    <input type="email" id="editCorreo" placeholder="Correo Electrónico">
                </div>

                <div class="field">
                <Label>Area:</Label>
                    <select id="editAreaTrabajo">
                        <option value="Almacen">Almacen</option>
                    </select>
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
    <script src="js/ScriptsHistoriatrabajadores/domHelpers.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/helpers.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/tablaHistorial.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/popup.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/main.js"></script>
</body>
</html>
