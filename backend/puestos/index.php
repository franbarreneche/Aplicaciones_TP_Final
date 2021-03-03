<?php
 require '../db.php';

 header('Access-Control-Allow-Methods: GET');
 /*
 $query="SELECT puestos.id,puestos.nombre,COUNT(puesto_id) FROM puestos JOIN postulantes ON puesto_id = puestos.id
 GROUP BY puestos.nombre,puestos.id
 ORDER BY puestos.nombre ASC;";
 $result = db::getInstance()->get_result($query);
echo json_encode(pg_fetch_all($result));
*/
$query="SELECT * FROM puestos ORDER BY nombre ASC";
$result = db::getInstance()->get_result($query);
echo json_encode(pg_fetch_all($result));
?>