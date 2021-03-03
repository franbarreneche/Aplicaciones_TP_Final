<?php
 require '../db.php';

 header('Access-Control-Allow-Methods: GET'); 
 
 $doc_postulante = $_GET["num_doc"];
 $query="SELECT * FROM postulantes where num_doc=".$doc_postulante;
 $resultQuery = db::getInstance()->get_result($query);
 $result = pg_fetch_array($resultQuery, null, PGSQL_ASSOC);
 if($result == false || $result == "false" ) {
    header("HTTP/1.1 404 Not Found");
    echo json_encode(["mensaje" => "No se encontro el postulante con esos datos"]);
 }    
 else 
    echo json_encode($result);
?>