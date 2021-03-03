<?php
require '../db.php';

header('Access-Control-Allow-Methods: POST');

$id = $_POST['id'];
$foto = $_FILES['foto'];

if($id && $foto) { 
    //guardamos la imagen en el server
    $nombre = random_int(1000,1000000) . $_FILES['foto']['name'];
    $file_tmp =$_FILES['foto']['tmp_name'];
    $destino = $_SERVER['DOCUMENT_ROOT']. '/empresa/fotos_perfil/' .$nombre;
    $guardo = move_uploaded_file($file_tmp,$destino);
    //actualizamos la BD
    $query =
		"UPDATE postulantes SET
		foto='$nombre'
        WHERE id=$id;";
    db::getInstance()->get_result($query);
    $result = db::getInstance()->get_result($query);
    echo json_encode($guardo);
}
 else {
	header("HTTP/1.1 400 Bad Request");
	echo json_encode(["mensaje" => "No se puede cargar una imagen sin ID y/o archivo Imagen"]);
}