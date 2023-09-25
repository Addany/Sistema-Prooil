<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial del Almacén</title>
  <link rel="stylesheet" href="css/estilosalmacen.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body>

  <div id="page-container">
    <div id="navbar"></div>
    
    <script>
      $('#navbar').load('Navegacion/navbar.php', function() {
        $.getScript("Navegacion/navbar.js", function() {
          $('#page-container').fadeIn();
        });
      });
    </script>

    <form class="form-buscar">
      <div class="input-group">
        <label for="buscador">Busqueda por texto:</label>
        <input type="text" id="buscador" placeholder="Buscar por texto o ID">
      </div>

      <div class="input-group">
        <label for="fechaInicio">Fecha Inicio:</label>
        <input type="date" id="fechaInicio">
      </div>

      <div class="input-group">
        <label for="fechaFin">Fecha Fin:</label>
        <input type="date" id="fechaFin">
      </div>

      <div class="input-group">
        <label for="categoria">Categoria:</label>
        <select id="categoria">
          <option value="todos">Todos</option>
          <option value="Prestado">Prestado</option>
          <option value="Devuelto">Devuelto</option>
        </select>
      </div>

      <div class="input-group">
        <button type="button" id="eliminarBusqueda">Limpiar busqueda</button>
      </div>
    </form>

    <section class="seccion-tabla">
      <table id="tabla-historial">
        <thead>
          <tr>
            <th>Foto</th>
            <th>ID</th>
            <th>Tipo de herramienta</th>
            <th>Marca</th>
            <th>Orden de compra</th>
            <th>Tamaño</th>
            <th>No. Serie</th>
            <th>Estado</th>
            <th>Color</th>
            <th>Fecha de Registro</th>
            <th>Descripción</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Aquí se insertarán las filas -->
        </tbody>
      </table>
    </section>
    <div id="overlay"></div>
    <div id="popup">
        <form id="editarHerramientaForm">
            <h3>Editar datos</h3>
            
            <div class="inputWrapper">
                <label for="editFotoInput">Foto:</label>
                <img id="editFoto" src="" alt="Foto del herramienta" />
                <input type="file" class="hidden toggleInput" id="editFotoInput" onchange="actualizarFoto(event)">
                <button type="button" onclick="toggleInput('editFotoInput', this)">+</button>
            </div>


            <div class="inputWrapper">
                <label for="editTipoherramienta">Tipo de:</label>
                <input type="text" class="hidden toggleInput" id="editTipoherramienta" placeholder="Tipo de">
                <button type="button" onclick="toggleInput('editTipoherramienta', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editMarca">Marca:</label>
                <input type="text" class="hidden toggleInput" id="editMarca" placeholder="Marca">
                <button type="button" onclick="toggleInput('editMarca', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editTamano">Tamaño:</label>
                <input type="text" class="hidden toggleInput" id="editTamano" placeholder="Tamaño">
                <button type="button" onclick="toggleInput('editTamano', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editOrdenCompra">Orden de compra:</label>
                <input type="text" class="hidden toggleInput" id="editOrdenCompra" placeholder="Orden de compra">
                <button type="button" onclick="toggleInput('editOrdenCompra', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editNoSerie">Número de Serie:</label>
                <input type="text" class="hidden toggleInput" id="editNoSerie" name="noSerie">
                <button type="button" onclick="toggleInput('editNoSerie', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editEstado">Estado:</label>
                <input type="text" class="hidden toggleInput" id="editEstado" placeholder="Estado">
                <button type="button" onclick="toggleInput('editEstado', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editColor">Color:</label>
                <input type="text" class="hidden toggleInput" id="editColor" placeholder="Color">
                <button type="button" onclick="toggleInput('editColor', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editFecha">Fecha:</label>
                <input type="date" class="hidden toggleInput" id="editFecha">
                <button type="button" onclick="toggleInput('editFecha', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editDescripcion">Descripción:</label>
                <input type="text" class="hidden toggleInput" id="editDescripcion" placeholder="Descripción" >
                <button type="button" onclick="toggleInput('editDescripcion', this)">+</button>
            </div>

            <div class="inputWrapper">
                <label for="editEstatus">Estatus:</label>
                <input type="text" class="hidden toggleInput" id="editEstatus" placeholder="Estatus">
                <button type="button" onclick="toggleInput('editEstatus', this)">+</button>
            </div>

            <button type="submit" class="guardar">Guardar</button>
            <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popup')">Cancelar</button>
        </form>
    </div>
  </div>

  <script src="js/ScriptsHistorialHerramientas/domHelpers.js"></script>
  <script src="js/ScriptsHistorialHerramientas/helpers.js"></script>
  <script src="js/ScriptsHistorialHerramientas/tablaHistorial.js"></script>
  <script src="js/ScriptsHistorialHerramientas/popup.js"></script>
  <script src="js/ScriptsHistorialHerramientas/data.js"></script>
  <script src="js/ScriptsHistorialHerramientas/main.js"></script>
</body>
</html>




