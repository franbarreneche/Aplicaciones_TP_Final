<?php
 require '../db.php';

 header('Access-Control-Allow-Methods: GET');

 $query="SELECT * FROM postulantes";
 $result = db::getInstance()->get_result($query);
echo json_encode(pg_fetch_all($result));
?>