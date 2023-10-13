<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de entregas de EPP</title>
    <link rel="stylesheet" href="css/estilohistorialentregas.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="icon" href="Resources/Icons/Manos.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <?php
    include 'php/session.php';
    ?>
    <header>

    </header>
    <div id="page-container">
        <main>

            <div id="navbar"></div>

            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
                            <input type="text" id="buscador" placeholder="Trabajador Solicitante, Folio, etc.">
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
                            <button type="button" onclick="buscar()">Limpiar Búsqueda</button>
                        </div>
                    </form>
                </div>
                <table id="tabla-historial">
                    <thead>
                        <tr>
                            <th>Folio</th>
                            <th>Fecha de Transacción</th>
                            <th>Trabajador Solicitante</th>
                            <th>¿Quien Autorizó?</th>
                            <th>Observaciones</th>
                            <th>Status del proceso del entrega</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Folio">12345</td>
                            <td data-label="Fecha de Transacción">20-02-2020</td>
                            <td data-label="Trabajador solicitante">Juan</td>
                            <td data-label="¿Quien Autorizó?">Adrian</td>
                            <td data-label="Observaciones">Perdida de las herramientas</td>
                            <td data-label="Status del proceso del entrega">Pendiente</td>
                            <td data-label="Acciones">
                                <button class="accion-button" onclick="verHerramienta('${item.folio}')">Ver</button>
                                <button class="accion-button" onclick="editarEntregaForm(this)">Editar</button>
                                <button class="accion-button">Generar documento</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
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
                    <label for="editFechaTransaccion">Fecha de Transacción:</label>
                    <input type="date" id="editFechaTransaccion" placeholder="Fecha de Transacción">
                </div>

                <div class="field">
                    <label for="edittrabajadorSolicitante">Trabajador solicitante:</label>
                    <input type="text" id="edittrabajadorSolicitante" placeholder="Nombre del Trabajador">
                </div>

                <div class="field">
                    <label for="editQuienAutorizo">¿Quién Autorizó?:</label>
                    <input type="text" id="editQuienAutorizo" placeholder="Quien Autorizó">
                </div>

                <div class="field">
                    <label for="editObservaciones">Observaciones:</label>
                    <input type="text" id="editObservaciones" placeholder="Observaciones">
                </div>

                <div class="field">
                    <label for="editEstadoproceso">Status del proceso del entrega:</label>
                    <select id="editEstadoproceso">
                        <option value="Pendiente">Pendiente</option>
                        <option value="Completado">Completado</option>
                    </select>
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
                        <tr>
                            <td data-label="Nombre">Casco</td>
                            <td data-label="Modelo">rj2343</td>
                            <td data-label="Tipo">3M</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" onclick="cerrarPopup('popupVer')">Cerrar</button>  
            </form>
        </div>
    </div>


    <script src="js/scriptnavegacion.js"></script>
    <script src="js/tablaHistorial.js"></script>
    <script src="js/popup2.js"></script>

</body>
</html>
