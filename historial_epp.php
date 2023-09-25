<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial de EPP</title>
  <link rel="stylesheet" href="css/estiloshistorialEPP.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>

  <div id="page-container">
    <main>
      <div id="navbar"></div>
        <section class="container">
          <div class="form-container">
            <form class="form-buscar">
              <div class="input-group">
                <label for="buscador">Busqueda por texto:</label>
                <input type="text" id="buscador" placeholder="Buscar por texto o ID" oninput="buscar()">
              </div>
              <div class="input-group">
                <label for="fechaInicio">Fecha Inicio:</label>
                <input type="date" id="fechaInicio" onchange="buscar()">
              </div>
              <div class="input-group">
                <label for="fechaFin">Fecha Fin:</label>
                <input type="date" id="fechaFin" onchange="buscar()">
              </div>
              <div class="input-group">
                <label for="categoria">Categoria:</label>
                <select id="categoria" onchange="buscar()">
                  <option value="todos">Todos</option>
                  <option value="casco contra impacto">Casco contra impacto</option>
                </select>
                <button type="button" id="eliminarBusqueda" onclick="buscar()">Limpiar busqueda</button>
              </div>
            </form>
          </div>
          <table id="tabla-historial">
            <thead>
              <tr>
                <th>Foto</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Clase</th>
                <th>Talla</th>
                <th>Orden de compra</th>
                <th>Fecha de registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <!-- Aquí se insertarán las filas -->
            </tbody>
          </table>
        </section>
      </main>

      <div id="overlay"></div>
      <div id="popup">
          <form id="editarEPP">
              <h3>Editar datos</h3>
              <div class="inputWrapper">
                  <label for="editFotoInput">Foto:</label>
                  <img id="editFoto" src="" alt="Foto del EPP" />
                  <input type="file" class="hidden toggleInput" id="editFotoInput" onchange="actualizarFoto(event)">
                  <button type="button" onclick="toggleInput('editFotoInput', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editId">ID:</label>
                  <input type="text" class="hidden toggleInput" id="editId" placeholder="ID" >
                  <button type="button" onclick="toggleInput('editId', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editNombre">Nombre:</label>
                  <input type="text" class="hidden toggleInput" id="editNombre" placeholder="Nombre">
                  <button type="button" onclick="toggleInput('editNombre', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editCantidad">Cantidad:</label>
                  <input type="text" class="hidden toggleInput" id="editCantidad" placeholder="Cantidad" >
                  <button type="button" onclick="toggleInput('editCantidad', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editMarca">Marca:</label>
                  <input type="text" class="hidden toggleInput" id="editMarca" placeholder="Marca">
                  <button type="button" onclick="toggleInput('editMarca', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editModelo">Modelo:</label>
                  <input type="text" class="hidden toggleInput" id="editModelo" placeholder="Modelo" >
                  <button type="button" onclick="toggleInput('editModelo', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editTipo">Tipo:</label>
                  <input type="text" class="hidden toggleInput" id="editTipo" placeholder="Tipo">
                  <button type="button" onclick="toggleInput('editTipo', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editClase">Clase:</label>
                  <input type="text" class="hidden toggleInput" id="editClase" placeholder="Clase">
                  <button type="button" onclick="toggleInput('editClase', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editTalla">Talla:</label>
                  <input type="text" class="hidden toggleInput" id="editTalla" placeholder="Talla">
                  <button type="button" onclick="toggleInput('editTalla', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editOrdenCompra">Orden de Compra:</label>
                  <input type="text" class="hidden toggleInput" id="editOrdenCompra" placeholder="Orden de Compra" >
                  <button type="button" onclick="toggleInput('editOrdenCompra', this)">+</button>
              </div>
              <div class="inputWrapper">
                  <label for="editFechaRegistro">Fecha de Registro:</label>
                  <input type="date" class="hidden toggleInput" id="editFechaRegistro" placeholder="Fecha de Registro">
                  <button type="button" onclick="toggleInput('editFechaRegistro', this)">+</button>
              </div>
              <button type="submit" class="guardar">Guardar</button>
              <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popup')">Cancelar</button>
          </form>
      </div>
  </div>


  <script>
    $('#navbar').load('Navegacion/navbar.php', function() {
      $.getScript("Navegacion/navbar.js", function() {
      $('#page-container').fadeIn();
      });
    });
  </script>


  <script src="js/ScriptsHistorialEPP/domHelpers.js"></script>
  <script src="js/ScriptsHistorialEPP/helpers.js"></script>
  <script src="js/ScriptsHistorialEPP/tablaHistorial.js"></script>
  <script src="js/ScriptsHistorialEPP/popup.js"></script>
  <script src="js/ScriptsHistorialEPP/data.js"></script>
  <script src="js/ScriptsHistorialEPP/main.js"></script>
</body>
</html>




