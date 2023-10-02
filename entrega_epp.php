<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Entrega de Equipo EPP</title>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="css/estilosentregaEPP.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="icon" href="Resources/Icons/Manos.ico">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
        <main>
            <div id="navbar"></div>

            <section class="container">
                <div class="form-container">
                    <h3>Formulario de Entrega de Equipo EPP</h3>
                    <form id="deliveryForm">
                        <label for="eppList">Selecciona el EPP:</label>
                        <select id="eppList" class="eppList" required onchange="onEPPSelected(this.value)">
                            <option value="">Selecciona un EPP</option>
                            <option value='{"id": "123", "name": "Casco", "anatomicRegion": "Cabeza"}'>Casco</option>
                        </select>

                        <div class="selected-epp">
                            <br>
                            <Label>EPP Seleccionados:</Label>
                            <div id="tableContainer" class="table-container">
                                <table id="selected-epp-table">
                                    <thead>
                                        <tr>
                                            <th>ID de EPP</th>
                                            <th>Nombre de EPP</th>
                                            <th>Región Anatómica</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="selected-epp-tbody">
                                        <!-- Los EPP seleccionados se mostrarán aquí -->
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <label for="observations">Observaciones:</label>
                        <textarea id="observations"></textarea>

                        <div class="delivery-buttons">
                            <button type="submit">Solicitar Entrega</button>
                            <button type="button" onclick="cancelDelivery()">Borrar campo</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    </div>

    <script src="js/scriptnavegacion.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
    <script src="js/scriptspentregaEPP.js"></script>
</body>

</html>
