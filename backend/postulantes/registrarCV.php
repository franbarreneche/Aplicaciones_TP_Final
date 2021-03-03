<?php
require '../db.php';

header('Access-Control-Allow-Methods: POST');

$id = $_POST['id'];
$cv = $_FILES['cv'];

if($id && $cv) { 
    //guardamos la imagen en el server
    $nombre = $_FILES['cv']['name'];
    $file_tmp =$_FILES['cv']['tmp_name'];
    $destino = $_SERVER['DOCUMENT_ROOT']. '/empresa/cv_postulantes/' .$nombre;
    $guardo = move_uploaded_file($file_tmp,$destino);
    echo json_encode($guardo);
}
 else {
	header("HTTP/1.1 400 Bad Request");
	echo json_encode(["mensaje" => "No se puede cargar una imagen sin ID y/o archivo Imagen"]);
}