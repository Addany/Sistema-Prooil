<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial de herramientas</title>
  <link rel="stylesheet" href="css/estilosalmacen.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="icon" href="Resources/Icons/Tool.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body>
  <?php
  include 'php/session.php';
  include 'php/conexion_bd.php';
  #VARIABLES
  $porPagina = 25;
  $pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
  $offset = ($pagina - 1) * $porPagina;
  $tipoHerramienta = isset($_GET['tipo_herramienta']) ? $_GET['tipo_herramienta'] : '';
  $status = isset($_GET['status']) ? $_GET['status'] : '';
  $orden = isset($_GET['orden']) ? $_GET['orden'] : 'fecha_registro DESC';
  $fechaInicio = isset($_GET['fechaInicio']) ? $_GET['fechaInicio'] : '';
  $marca = isset($_GET['marca']) ? $_GET['marca'] : '';

  $parametros_filtro = http_build_query(array(
    'tipo_herramienta' => $tipoHerramienta,
    'status' => $status,
    'orden' => $orden,
    'fechaInicio' => $fechaInicio,
    'marca' => $marca
  ));



  $sql_tipos = "SELECT DISTINCT tipo_herramienta FROM herramientas ORDER BY tipo_herramienta ASC";
  $result_tipos = $conexion->query($sql_tipos);
  $tipos_herramienta = array();
  if ($result_tipos && $result_tipos->num_rows > 0) {
    while ($row = $result_tipos->fetch_assoc()) {
      $tipos_herramienta[] = $row['tipo_herramienta'];
    }
  }
  $sql_marcas = "SELECT DISTINCT marca FROM herramientas_cantidad ORDER BY marca ASC";
  $result_marcas = $conexion->query($sql_marcas);
  $marcas = array();
  if ($result_marcas && $result_marcas->num_rows > 0) {
    while ($row = $result_marcas->fetch_assoc()) {
      $marcas[] = $row['marca'];
    }
  }
  ?>

  <div id="page-container">
    <div id="navbar"></div>
    
    <form class="form-buscar" method="get">
      <div class="input-group">
        <label for="fechaInicio">Busqueda por Fecha:</label>
        <input type="date" id="fechaInicio" name="fechaInicio" value="<?php echo htmlspecialchars($fechaInicio); ?>">
      </div>

      <div class="input-group">
        <label for="tipo_herramienta">Tipo de herramienta:</label>
        <select name="tipo_herramienta">
          <option value="" <?php if ($tipoHerramienta == '') echo 'selected'; ?>>Todos los tipos</option>
          <?php foreach ($tipos_herramienta as $tipo): ?>
              <option value="<?php echo $tipo; ?>" <?php if ($tipoHerramienta == $tipo) echo 'selected'; ?>><?php echo $tipo; ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div class="input-group">
        <label for="marca">Marca:</label>
        <select name="marca">
          <option value="" <?php if ($marca == '') echo 'selected'; ?>>Todas las marcas</option>
          <?php foreach ($marcas as $marca_option): ?>
            <option value="<?php echo $marca_option; ?>" <?php if ($marca == $marca_option) echo 'selected'; ?>><?php echo $marca_option; ?></option>
          <?php endforeach; ?>
        </select>
      </div>

      <div class="input-group">
        <label for="orden">Ordenar por fecha:</label>
        <select name="orden">
          <option value="fecha_registro DESC" <?php if ($orden == 'fecha_registro DESC') echo 'selected'; ?>>Más Reciente</option>
          <option value="fecha_registro ASC" <?php if ($orden == 'fecha_registro ASC') echo 'selected'; ?>>Más Viejo</option>
        </select>
      </div>

      <div class="input-group">
        <label for="categoria">Categoria:</label>
        <select name="status">
          <option value="" <?php if ($status == '') echo 'selected'; ?>>Todos los status</option>
          <option value="Disponible" <?php if ($status == 'Disponible') echo 'selected'; ?>>Disponible</option>
          <option value="En prestamo" <?php if ($status == 'En prestamo') echo 'selected'; ?>>En préstamo</option>
        </select>
      </div>
      <div class="input-group" id="filter">
          <button type="button" id="resetear" onclick="resetearFiltros()">Resetear Filtro</button>
          <button type="submit" value="Filtrar">Filtrar</button>
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
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <?php
          if ($conexion->connect_error) {
            die();
          }
          
          $sql = "SELECT herramientas_cantidad.*, herramientas.tipo_herramienta, herramientas.foto 
          FROM herramientas_cantidad 
          JOIN herramientas_tipo ON herramientas_cantidad.identificador = herramientas_tipo.identificador 
          JOIN herramientas ON herramientas_tipo.id_herramienta = herramientas.id_herramienta
          LIMIT $porPagina OFFSET $offset;";

          //Filtros
          $condiciones = [];
          if ($tipoHerramienta) {
            $condiciones[] = "herramientas.tipo_herramienta = '$tipoHerramienta'";
          }
          if ($status) {
            $condiciones[] = "herramientas_cantidad.disponibilidad = '$status'";
          }
          if ($fechaInicio) {
            $condiciones[] = "CAST(herramientas_cantidad.fecha_registro AS DATE) = '$fechaInicio'";
          }
          if ($marca) {
            $condiciones[] = "herramientas_cantidad.marca = '$marca'";
          }
          $condicionSql = implode(' AND ', $condiciones);
          if ($condicionSql) {
            $condicionSql = "WHERE $condicionSql";
          }

          $sql_total = "SELECT COUNT(*) as total 
          FROM herramientas_cantidad 
          JOIN herramientas_tipo ON herramientas_cantidad.identificador = herramientas_tipo.identificador 
          JOIN herramientas ON herramientas_tipo.id_herramienta = herramientas.id_herramienta 
          $condicionSql;";

          $result_total = $conexion->query($sql_total);

          if ($result_total && $result_total->num_rows > 0) {
            $row = $result_total->fetch_assoc();
            $totalRegistros = $row['total'];
            $totalPaginas = ceil($totalRegistros / $porPagina);
          }

          $sql = "SELECT herramientas_cantidad.*, herramientas.tipo_herramienta, herramientas.foto 
          FROM herramientas_cantidad 
          JOIN herramientas_tipo ON herramientas_cantidad.identificador = herramientas_tipo.identificador 
          JOIN herramientas ON herramientas_tipo.id_herramienta = herramientas.id_herramienta
          $condicionSql
          ORDER BY $orden
          LIMIT $porPagina OFFSET $offset;";
          
          $result = $conexion->query($sql);

          if ($result->num_rows > 0){
            while ($row = $result->fetch_assoc()) {
              $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
              $fechaObj = date_create_from_format('Y-m-d', $row["fecha_registro"]);
              $fechaFormateada = $fechaObj->format('d/m/Y');
              echo "<tr>";
              echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto de' class='imagen-herramienta'></td>";
              echo "<td data-label='ID'>" . $row["identificador"] . "</td>";
              echo "<td data-label='Tipo de herramienta'>" . $row["tipo_herramienta"] . "</td>";
              echo "<td data-label='Marca'>" . $row["marca"] . "</td>";
              echo "<td data-label='Orden de compra'>" . $row["orden_compra"] . "</td>";
              echo "<td data-label='Tamaño'>" . $row["tamaño"] . "cm</td>";
              echo "<td data-label='No. Serie'>" . $row["no_serie"] . "</td>";
              echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
              echo "<td data-label='Color'>" . $row["color"] . "</td>";
              echo "<td data-label='Fecha de Registro'>" . $fechaFormateada . "</td>";
              echo "<td data-label='Estatus'>" . $row["disponibilidad"] . "</td>";
              echo "<td data-label='Acciones'>";
              echo "<button class='accion-button' onclick='descargarQR(\"" . $row["identificador"] . "\")'>Descargar QR</button>";
              echo "<button class='accion-button' onclick='editarHerramienta(this)'>Editar</button>";
              echo "<button class='accion-button' onclick='intentarEliminar(this)'>Eliminar</button>";
              echo "</td>";
              echo "</tr>";
            }
          }
          $conexion->close();
          ?>
        </tbody>
      </table>
      
      <div class="pagination">
        <?php
        $range = 5; // Define el rango de páginas a mostrar
        $start = max(1, $pagina - floor($range / 2)); // Calcula la página inicial del rango
        $end = min($totalPaginas, $start + $range - 1); // Calcula la página final del rango

        // Ajusta el inicio si estamos cerca del final
        $start = max(1, $end - $range + 1);
        ?>

        <?php if($pagina > 1): ?>  
            <a class="prev" href="?pagina=<?php echo $pagina-1; ?>&<?php echo $parametros_filtro; ?>">&lt; Anterior</a>
        <?php endif; ?>

        <?php for($i = $start; $i <= $end; $i++): ?>
            <?php if($i == $pagina): ?>
                <span class="current-page"><?php echo $i; ?></span> 
            <?php else: ?>
                <a href="?pagina=<?php echo $i; ?>&<?php echo $parametros_filtro; ?>"><?php echo $i; ?></a>
            <?php endif; ?>
        <?php endfor; ?>

        <?php if($pagina < $totalPaginas): ?> 
            <a class="next" href="?pagina=<?php echo $pagina+1; ?>&<?php echo $parametros_filtro; ?>">Siguiente &gt;</a>
        <?php endif; ?>
      </div>

    </section>
    <div id="overlay" onclick="cerrarSiEsFuera(event, 'popup')"></div>
    <div id="popup">
      <form id="editarHerramientaForm">
          <h3>Editar datos</h3>

          <div class="field">
              <label for="editTipoherramienta">Tipo de Herramienta:</label>
              <input type="text" id="editTipoherramienta" placeholder="Tipo de">
          </div>

          <div class="field">
              <label for="editMarca">Marca:</label>
              <input type="text" id="editMarca" placeholder="Marca">
          </div>

          <div class="field">
              <label for="editOrdenCompra">Orden de compra:</label>
              <input type="text" id="editOrdenCompra" placeholder="Orden de compra">
          </div>

          <div class="field">
              <label for="editTamano">Tamaño:</label>
              <input type="text" id="editTamano" placeholder="Tamaño">
          </div>

          <div class="field">
              <label for="editNoSerie">No. serie:</label>
              <input type="text" id="editNoSerie" name="noSerie" />
          </div>

          <div class="field">
              <label for="editEstado">Estado:</label>
              <select id="editEstado">
                  <option value="bueno">Bueno</option>
                  <option value="regular">Regular</option>
                  <option value="malo">Malo</option>
              </select>
          </div>

          <div class="field">
              <label for="editColor">Color:</label>
              <input type="text" id="editColor" placeholder="Color">
          </div>

          <div class="field">
              <label for="editFecha">Fecha de Registro:</label>
              <input type="date" id="editFecha">
          </div>

          <button type="submit" class="guardar">Guardar</button>
          <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popup')">Cancelar</button>
      </form>
    </div>
  </div>
  <script src="js/descargarQR.js"></script>
  <script src="js/scriptnavegacion.js"></script>
  <script src="js/tablaHistorial.js"></script>
  <script src="js/popup.js"></script>
</body>
</html>




