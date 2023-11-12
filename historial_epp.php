<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial de EPP</title>
  <link rel="stylesheet" href="css/estiloshistorialEPP.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="icon" href="Resources/Icons/EPP.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
  <?php
  include 'php/session.php';
  include 'php/conexion_bd.php';

  $cantidadPorPagina = 20;

  $sql_total = "SELECT COUNT(*) as total 
              FROM cantidad_epp 
              JOIN epp_tipo ON cantidad_epp.identificador = epp_tipo.identificador
              JOIN epp ON epp_tipo.id_epp = epp.id_epp";
  $resultado_total = $conexion->query($sql_total);
  $fila_total = $resultado_total->fetch_assoc();
  $totalRegistros = $fila_total['total'];
  $totalPaginas = ceil($totalRegistros / $cantidadPorPagina);

  ?>

  <div id="page-container">
    <main>
      <div id="navbar"></div>
        <section class="container">
          <div class="form-container">
            <form class="form-buscar">
              <div class="input-group">
                <label for="buscador">Busqueda por texto:</label>
                <input type="text" id="buscador" placeholder="Nombre, Cantidad, etc.">
              </div>
              <div class="input-group">
                <label for="fechaorden">Ordenar por fecha:</label>
                <select id="fechaorden">
                  <option value="reciente">Más Reciente</option>
                  <option value="viejo">Más Viejo</option>
                </select>
              </div>
              <div class="input-group">
                <label for="clase">Clase:</label>
                <select id="clase">
                  <option value="todos">Todos</option>
                </select>
              </div>
              <div class="input-group">
                <label for="talla">Talla:</label>
                <select id="talla">
                  <option value="todos">Todos</option>
                </select>
              </div>
              <div class="input-group">
                <label for="marca">Marca:</label>
                <select id="marca">
                  <option value="todos">Todos</option>
                </select>
              </div>
              <div class="button-group"  id="filter">
                <button type="button" id="generarReporte"  onclick="verDatos(this)">Generar Reporte</button>
                <button type="button" id="eliminarBusqueda">Limpiar Búsqueda</button>
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
                <th>Clase</th>
                <th>Talla</th>
                <th>Orden de compra</th>
                <th>Fecha de Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <?php
              if ($conexion->connect_error) {
                die();
              }
              $pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
              $inicio = ($pagina - 1) * $cantidadPorPagina;
              $sql = "SELECT cantidad_epp.*, epp.nombre_epp, epp.foto 
                      FROM cantidad_epp 
                      JOIN epp_tipo ON cantidad_epp.identificador = epp_tipo.identificador
                      JOIN epp ON epp_tipo.id_epp = epp.id_epp
                      ORDER BY cantidad_epp.fecha_registro DESC
                      LIMIT $inicio, $cantidadPorPagina";
              $result = $conexion->query($sql);
              $vacio = "pendiente";

              if ($result->num_rows > 0){
                while ($row = $result->fetch_assoc()) {
                  $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
                  $fechaObj = date_create_from_format('Y-m-d', $row["fecha_registro"]);
                  $fechaFormateada = $fechaObj->format('d/m/Y');
                  echo "<tr>";
                  echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto de ' class='imagen-epp'></td>";
                  echo "<td data-label='ID'>" . $row["identificador"] . "</td>";
                  echo "<td data-label='Nombre'>" . $row["nombre_epp"] . "</td>";
                  echo "<td data-label='Cantidad'>" . $row["cantidad"] . "</td>";
                  echo "<td data-label='Marca'>" . $row["marca"] . "</td>";
                  echo "<td data-label='Modelo'>" . $row["modelo"] . "</td>";
                  echo "<td data-label='Clase'>" . $row["clase"] . "</td>";
                  echo "<td data-label='Talla'>" . $row["talla"] . "</td>";
                  echo "<td data-label='Orden de compra'>" . $row["orden_compra"] . "</td>";
                  echo "<td data-label='Fecha de Registro'>" . $fechaFormateada . "</td>";
                  
                  echo "<td data-label='Acciones'>";
                  echo "<button class='accion-button' onclick='editarEPP(this)'>Editar</button>";
                  echo "</td>";
                  echo "</tr>";
                }
              }
              $conexion->close();
              ?>
            </tbody>
          </table>
        </section>
      </main>

      <div class="pagination">
            <?php
            $range = 5; 
            $start = max(1, $pagina - floor($range / 2)); 
            $end = min($totalPaginas, $start + $range - 1); 

            $start = max(1, $end - $range + 1);
            ?>

            <?php if($pagina > 1): ?>  
                <a class="prev" href="?pagina=<?php echo $pagina-1; ?>">Anterior</a>
            <?php endif; ?>

            <?php for($i = $start; $i <= $end; $i++): ?>
                <?php if($i == $pagina): ?>
                    <span class="current-page"><?php echo $i; ?></span> 
                <?php else: ?>
                    <a href="?pagina=<?php echo $i; ?>"><?php echo $i; ?></a>
                <?php endif; ?>
            <?php endfor; ?>

            <?php if($pagina < $totalPaginas): ?>  
                <a class="next" href="?pagina=<?php echo $pagina+1; ?>">Siguiente</a>
            <?php endif; ?>
      </div>

      <div id="overlay" onclick="cerrarSiEsFuera(event, 'popup', 'popupVer')"></div>
      <div id="popup">
        <form id="editarEPP">
            <h3>Editar datos</h3>

            <div class="field">
                <label for="editNombre">Nombre:</label>
                <input type="text" id="editNombre" placeholder="Nombre">
            </div>

            <div class="field">
                <label for="editCantidad">Cantidad:</label>
                <input type="text" id="editCantidad" placeholder="Cantidad">
            </div>

            <div class="field">
                <label for="editMarca">Marca:</label>
                <input type="text" id="editMarca" placeholder="Marca">
            </div>

            <div class="field">
                <label for="editModelo">Modelo:</label>
                <input type="text" id="editModelo" placeholder="Modelo">
            </div>

            <div class="field">
                <label for="editClase">Clase:</label>
                <input type="text" id="editClase" placeholder="Clase">
            </div>

            <div class="field">
                <label for="editTalla">Talla:</label>
                <input type="text" id="editTalla" placeholder="Talla">
            </div>

            <div class="field">
                <label for="editOrdenCompra">Orden de Compra:</label>
                <input type="text" id="editOrdenCompra" placeholder="Orden de Compra">
            </div>

            <div class="field">
                <label for="editFechaRegistro">Fecha de Registro:</label>
                <input type="date" id="editFechaRegistro" placeholder="Fecha de Registro">
            </div>
            <div class="button-group">
              <button type="submit" class="guardar">Guardar</button>
              <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popup')">Cancelar</button>
            </div>
        </form>
    </div>
    <div id="popupVer" class="popup">
            <form id="generarReporteForm"> 
                <h3>Generar Reporte</h3>
                
                <div class="input-group">
                    <div class="input-container">
                        <label for="anioReporte">Selecciona el año:</label>
                        <select id="anioReporte" name="anioReporte">
                            <?php for($i = 2000; $i <= 2050; $i++): ?>
                                <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                            <?php endfor; ?>
                        </select>
                    </div>
    
                    <div class="input-container">
                        <label for="mesReporte">Selecciona el mes:</label>
                        <select id="mesReporte" name="mesReporte">
                            <option value="" selected>Todo el año</option>
                            <?php for($i = 1; $i <= 12; $i++): ?>
                                <option value="<?php echo str_pad($i, 2, '0', STR_PAD_LEFT); ?>">
                                    <?php echo date('F', mktime(0, 0, 0, $i, 10)); ?>
                                </option>
                            <?php endfor; ?>
                        </select>
                    </div>
                </div>
                <div class="button-group">
                    <button type="button" onclick="generarReporte()">Generar Reporte</button>
                    <button type="button" onclick="cerrarPopup('popupReporte')">Cerrar</button>
                </div>
            </form>
        </div>
    </div>


  <script src="js/scriptnavegacion.js"></script>
  <script src="js/tablaHistorial.js"></script>
  <script src="js/popup.js"></script>
  <script src="js/prueba3.js"></script>
</body>
</html>




