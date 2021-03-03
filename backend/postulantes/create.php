<?php
 require '../db.php';
 header('Access-Control-Allow-Methods: POST'); 
 
 // Takes raw data from the request
 $json = file_get_contents('php://input');
 // Converts it into a PHP object
 $data = json_decode($json);

 $apellido = $data->apellido;
 $nombre = $data->nombre;
 $email = $data->email;
 $num_doc = $data->num_doc;
 $fecha_nac = $data->fecha_nac;

if($apellido && $nombre && $email && $num_doc && $fecha_nac) {
    $query=
    "INSERT INTO postulantes(
        apellido, nombre, num_doc, email, fecha_nac)
        VALUES ('$apellido', '$nombre', '$num_doc', '$email', '$fecha_nac');";
    db::getInstance()->get_result($query);
    $query="SELECT * FROM postulantes WHERE num_doc = $num_doc";
    $result = db::getInstance()->get_result($query);
    echo json_encode(pg_fetch_array($result, null, PGSQL_ASSOC));    
}
else  {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(["mensaje" => "No se puede agregar un postulante sin los suficientes datos"]);
} 

 
?>