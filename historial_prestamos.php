<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de préstamos</title>
    <link rel="stylesheet" href="css/estilohistorial.css">
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

    <main>
        <div id="page-container">
            <div id="navbar"></div>
            <section class="container">
                <div class="form-container">
                    <form class="form-buscar">
                        <div class="input-group">
                            <label for="buscador">Buscar por texto:</label>
                            <input type="text" id="buscador" placeholder="Nombre del Trabajador, Folio, etc.">
                        </div>
                        <div class="input-group">
                            <label for="fechaInicio">Fecha inicio:</label>
                            <input type="date" id="fechaInicio">
                        </div>
                        <div class="input-group">
                            <label for="fechaFin">Fecha final:</label>
                            <input type="date" id="fechaFin">
                        </div>
                        <div class="input-group">
                            <label for="categoria">Categoría:</label>
                            <select id="categoria">
                                <option value="todos">Todos</option>
                                <option value="Concretado">Concretado</option>
                                <option value="No concretado">No concretado</option>
                            </select>
                            <button type="button">Limpiar Búsqueda</button>
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
                            <th>¿Quien Autorizó?</th>
                            <th>Observaciones</th>
                            <th>Status del prestamo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Folio">12345</td>
                            <td data-label="Nombre del Trabajador">Juan</td>
                            <td data-label="Fecha de Transacción">08-12-2022</td>
                            <td data-label="Fecha de Devolución">08-12-2022</td>
                            <td data-label="Quien Autorizó">Persona 1</td>
                            <td data-label="Observaciones">Maltratado leve</td>
                            <td data-label="Estado">Pendiente</td>
                            <td data-label="Acciones">
                                <button class="accion-button" onclick="verHerramienta()">Ver</button>
                                <button class="accion-button" onclick="editarPrestamoForm(this)">Editar</button>
                                <button class="accion-button">Generar documento</button>
                                <button class="accion-button" onclick="intentarEliminar(this)">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
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
                <label for="editNombreDelTrabajador">Nombre del Trabajador:</label>
                <input type="text" id="editNombreDelTrabajador" placeholder="Nombre del Trabajador">
            </div>

            <div class="field">
                <label for="editFechaTransaccion">Fecha de Transacción:</label>
                <input type="date" id="editFechaTransaccion" placeholder="Fecha de Transacción">
            </div>

            <div class="field">
                <label for="editFechaDevolucion">Fecha de Devolución:</label>
                <input type="date" id="editFechaDevolucion" placeholder="Fecha de Devolución">
            </div>

            <div class="field">
                <label for="editQuienAutorizo">¿Quién Autorizó?:</label>
                <select id="editQuienAutorizo">
                    <option value="Persona 1">Persona 1</option>
                    <option value="Persona 2">Persona 2</option>
                </select>
            </div>

            <div class="field">
                <label for="editObservaciones">Observaciones:</label>
                <input type="text" id="editObservaciones" placeholder="Observaciones">
            </div>

            <div class="field">
                <label for="editestado">Status del prestamo:</label>
                <select id="editestado">
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                </select>
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
                    <tr>
                        <td data-label="Seleccion de entrega"><input type="checkbox"></td>
                        <td data-label="Tipo de herramienta">Destornillador</td>
                        <td data-label="N. Serie">123123123</td>
                        <td data-label="Marca">Trupper</td>
                    </tr>
                    <tr>
                        <td data-label="Seleccion de entrega"><input type="checkbox"></td>
                        <td data-label="Tipo de herramienta">Destornillador</td>
                        <td data-label="N. Serie">123123123</td>
                        <td data-label="Marca">Trupper</td>
                    </tr>
                </tbody>
            </table>
            <label for="observaciones">Observaciones:</label>
            <textarea id="observaciones" placeholder="Ingrese observaciones aquí..."></textarea>
            <div class="button-group">
                <button type="button">Guardar</button> 
                <button type="button" onclick="cerrarPopup('popupVer')">Cancelar</button> 
            </div> 
        </form>
    </div>

    <script src="js/scriptnavegacion.js"></script>
    <script src="js/tablaHistorial.js"></script>
    <script src="js/popup2.js"></script>

</body>
</html>
