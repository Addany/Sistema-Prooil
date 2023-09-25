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
    <header>
        <!-- Barra de navegación aquí -->
    </header>

    <div id="page-container">
        <div id="navbar"></div>

        <script>
            $('#navbar').load('Navegacion/navbar.php', function() {
            $.getScript("Navegacion/navbar.js", function() {
                $('#page-container').fadeIn();
            });
            });
        </script>
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
                        <!-- Contenido de las filas aquí -->
                    </tr>
                </tbody>
            </table>
            </section>
        </main>

        <div id="overlay"></div>

        <div id="popupEditar">
            <form id="editarTrabajadorForm">
                <h3>Editar datos</h3>
                <div class="inputWrapper">
                <label for="Foto">Foto</label>
                <img id="editFoto" src="" alt="Foto del Trabajador">
                    <button type="button" onclick="toggleInput('editFotoInput', this)">+</button>
                    <input type="file" id="editFotoInput" class="hidden toggleInput" onchange="actualizarFoto(event)">
                </div>
                <div class="inputWrapper">
                    <label for="editEstado">Estado</label>
                    <button type="button" onclick="toggleInput('editEstado', this)">+</button>
                    <select id="editEstado" class="hidden toggleInput">
                        <option value="Alta">Alta</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>
                <div class="inputWrapper">
                    <label for="editTipoRegistro">Tipo de Registro</label>
                    <button type="button" onclick="toggleInput('editTipoRegistro', this)">+</button>
                    <select id="editTipoRegistro" class="hidden toggleInput">
                        <option value="Trabajador">Trabajador</option>
                        <option value="Invitado">Invitado</option>
                    </select>
                </div>
                <div class="inputWrapper">
                    <label for="editID">ID</label>
                    <button type="button" onclick="toggleInput('editID', this)">+</button>
                    <input type="text" id="editID"  class="hidden toggleInput" placeholder="ID">
                </div>
                <div class="inputWrapper">
                    <label for="editNombre">Nombre</label>
                    <button type="button" onclick="toggleInput('editNombre', this)">+</button>
                    <input type="text" id="editNombre"   class="hidden toggleInput" placeholder="Nombre">
                </div>
                <div class="inputWrapper">
                    <label for="editTelefono">Teléfono</label>
                    <button type="button" onclick="toggleInput('editTelefono', this)">+</button>
                    <input type="text" id="editTelefono"   class="hidden toggleInput" placeholder="Teléfono">
                </div>
                <div class="inputWrapper">
                    <label for="editCorreo">Correo Electrónico</label>
                    <button type="button" onclick="toggleInput('editCorreo', this)">+</button>
                    <input type="email" id="editCorreo"   class="hidden toggleInput" placeholder="Correo Electrónico">
                </div>
                <div class="inputWrapper">
                    <label for="editAreaTrabajo">Área de Trabajo</label>
                    <button type="button" onclick="toggleInput('editAreaTrabajo', this)">+</button>
                    <select id="editAreaTrabajo" class="hidden toggleInput">
                        <option value="Almacen">Almacen</option>
                    </select>
                </div>
                <div class="inputWrapper">
                    <label for="editFechaIngreso">Fecha de Ingreso</label>
                    <button type="button" onclick="toggleInput('editFechaIngreso', this)">+</button>
                    <input type="date" id="editFechaIngreso"  class="hidden toggleInput" placeholder="Fecha de Ingreso">
                </div>
                <button type="submit" class="guardar">Guardar</button>
                <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>
            </form>
        </div>
    </div>


    <script src="js/ScriptsHistoriatrabajadores/domHelpers.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/helpers.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/data.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/tablaHistorial.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/popup.js"></script>
    <script src="js/ScriptsHistoriatrabajadores/main.js"></script>
</body>
</html>
