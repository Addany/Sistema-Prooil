<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Préstamos y Devoluciones</title>
    <link rel="stylesheet" href="css/estilohistorialentregas.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <header>
        <!-- Barra de navegación aquí -->
    </header>
    <div id="page-container">
        <main>

            <div id="navbar"></div>

            <script>
                $('#navbar').load('Navegacion/navbar.php', function() {
                  $.getScript("Navegacion/navbar.js", function() {
                    $('#page-container').fadeIn();
                  });
                });
              </script>
              
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
                            <th>Fecha de Transacción</th>
                            <th>Trabajador solicitante</th>
                            <th>Quien Autorizó</th>
                            <th>Observaciones</th>
                            <th>Estado del proceso del entrega</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Las filas de la tabla se generarán aquí -->
                    </tbody>
                </table>
            </section>
        </main>

        <div id="overlay"></div>
        <div id="popupEditar">
            <form id="editarPrestamoForm">
                <h3>Editar datos</h3>
                
                <div class="inputWrapper">
                    <label for="editFolio">Folio:</label>
                    <input type="text" class="hidden toggleInput" id="editFolio" placeholder="Folio">
                    <button type="button" onclick="toggleInput('editFolio', this)">+</button>
                </div>

                <div class="inputWrapper">
                    <label for="editFechaTransaccion">Fecha de Transacción:</label>
                    <input type="text" class="hidden toggleInput" id="editFechaTransaccion" placeholder="Fecha de Transacción">
                    <button type="button" onclick="toggleInput('editFechaTransaccion', this)">+</button>
                </div>

                <div class="inputWrapper">
                    <label for="edittrabajadorSolicitante">Nombre del Trabajador:</label>
                    <input type="text" class="hidden toggleInput" id="edittrabajadorSolicitante" placeholder="Nombre del Trabajador">
                    <button type="button" onclick="toggleInput('edittrabajadorSolicitante', this)">+</button>
                </div>

                <div class="inputWrapper">
                    <label for="editQuienAutorizo">Quien Autorizó:</label>
                    <input type="text" class="hidden toggleInput" id="editQuienAutorizo" placeholder="Quien Autorizó">
                    <button type="button" onclick="toggleInput('editQuienAutorizo', this)">+</button>
                </div>

                <div class="inputWrapper">
                    <label for="editObservaciones">Observaciones:</label>
                    <input type="text" class="hidden toggleInput" id="editObservaciones" placeholder="Observaciones" >
                    <button type="button" onclick="toggleInput('editObservaciones', this)">+</button>
                </div>

                <div class="inputWrapper">
                    <label for="editEstadoproceso">Estado:</label>
                    <input type="text" class="hidden toggleInput" id="editEstadoproceso" placeholder="Estado">
                    <button type="button" onclick="toggleInput('editEstadoproceso', this)">+</button>
                </div>

                <button type="submit" class="guardar">Guardar</button>
                <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popupEditar')">Cancelar</button>
            </form>
        </div>

        <div id="popupVer" class="popup">
            <form id="verPrestamoForm"> 
                <h3>Detalles de la entrega</h3>
                <label>EPP entregado:</label>
                <table id="listaEPP">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Modelo</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Las filas de herramientas irán aquí -->
                    </tbody>
                </table>
                <button type="button" onclick="cerrarPopup('popupVer')">Cerrar</button>  
            </form>
        </div>
    </div>

    <script src="js/ScriptsHistorialentregas/domHelpers.js"></script>
    <script src="js/ScriptsHistorialentregas/helpers.js"></script>
    <script src="js/ScriptsHistorialentregas/data.js"></script>
    <script src="js/ScriptsHistorialentregas/tablaHistorial.js"></script>
    <script src="js/ScriptsHistorialentregas/popup.js"></script>
    <script src="js/ScriptsHistorialentregas/main.js"></script>

</body>
</html>
