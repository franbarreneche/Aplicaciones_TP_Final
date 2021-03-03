<?php
 require '../db.php';

 header('Access-Control-Allow-Methods: GET');
 
 $id_puesto = $_GET["id"];

 $query="SELECT count(*) FROM postulantes where puesto_id=$id_puesto";
 $result = db::getInstance()->get_result($query);
 echo json_encode(pg_fetch_array($result, null, PGSQL_ASSOC));
?>