<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Préstamos y Devoluciones</title>
    <link rel="stylesheet" href="css/estilohistorial.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
</head>
<body>
    <header>
        <!-- Barra de navegación aquí -->
    </header>

    <main>
        <div id="page-container">
            <div id="navbar"></div>
            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
                            <input type="text" id="buscador" placeholder="Nombre de la herramienta, marca, etc." oninput="buscar()">
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
                            <button type="button" onclick="buscar()">Limpiar busqueda</button>
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
                            <th>Quien Autorizó</th>
                            <th>Observaciones</th>
                            <th>Estado del proceso del prestamo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Las filas de la tabla se generarán aquí -->
                    </tbody>
                </table>
            </section>
        </div>
    </main>

    <div id="overlay"></div>
    <div id="popupEditar">
        <form id="editarPrestamoForm">
            <h3>Editar datos</h3>
            
            <div class="inputWrapper">
                <label for="editFolio">Folio:</label>
                <input type="text" class="hidden toggleInput " id="editFolio" placeholder="Folio">
                <button type="button" onclick="toggleInput('editFolio', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editNombreDelTrabajador">Nombre del Trabajador:</label>
                <input type="text" class="hidden toggleInput" id="editNombreDelTrabajador" placeholder="Nombre del Trabajador">
                <button type="button" onclick="toggleInput('editNombreDelTrabajador', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editFechaTransaccion">Fecha de Transacción:</label>
                <input type="text" class="hidden toggleInput" id="editFechaTransaccion" placeholder="Fecha de Transacción">
                <button type="button" onclick="toggleInput('editFechaTransaccion', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editFechaDevolucion">Fecha de Devolución:</label>
                <input type="text" class="hidden toggleInput" id="editFechaDevolucion" placeholder="Fecha de Devolución">
                <button type="button" onclick="toggleInput('editFechaDevolucion', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editQuienAutorizo">Quien Autorizó:</label>
                <input type="text" class="hidden toggleInput" id="editQuienAutorizo" placeholder="Quien Autorizó">
                <button type="button" onclick="toggleInput('editQuienAutorizo', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editObservaciones">Observaciones:</label>
                <input type="text" class="hidden toggleInput" id="editObservaciones" placeholder="Observaciones">
                <button type="button" onclick="toggleInput('editObservaciones', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editestado">Estado del prestamo:</label>
                <input type="text" class="hidden toggleInput" id="editestado" placeholder="Estado del prestamo">
                <button type="button" onclick="toggleInput('editestado', this)">+</button>
            </div>

            <button type="submit" class="guardar">Guardar</button>
            <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>
        </form>
    </div>

    <div id="popupVer" class="popup">
        <form id="verPrestamoForm"> 
            <h3>Detalles del Préstamo</h3>
            <label>Herramientas Prestadas:</label>
            <table id="listaHerramientas">
                <thead>
                    <tr>
                        <th>Seleccionar</th>
                        <th>Nombre</th>
                        <th>Número de Serie</th>
                        <th>Marca</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Las filas de herramientas irán aquí -->
                </tbody>
            </table>
            <label for="observaciones">Observaciones:</label>
            <textarea id="observaciones" placeholder="Ingrese observaciones aquí..."></textarea>
            <div class="button-group">
                <button type="button" onclick="cerrarPopup('popupVer')">Concretar prestamo</button> 
                <button type="button" onclick="cerrarPopup('popupVer')">Cancelar</button> 
            </div> 
        </form>
    </div>

    <script src="js/scriptnavegacion.js"></script>
    <script src="js/ScriptsHistorialprestamo/domHelpers.js"></script>
    <script src="js/ScriptsHistorialprestamo/helpers.js"></script>
    <script src="js/ScriptsHistorialprestamo/data.js"></script>
    <script src="js/ScriptsHistorialprestamo/tablaHistorial.js"></script>
    <script src="js/ScriptsHistorialprestamo/popup.js"></script>
    <script src="js/ScriptsHistorialprestamo/main.js"></script>

</body>
</html>
