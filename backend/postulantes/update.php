<?php
require '../db.php';

header('Access-Control-Allow-Methods: PUT');

// Takes raw data from the request
$json = file_get_contents('php://input');
// Converts it into a PHP object
$data = json_decode($json);

$id = $data->id;
$apellido = $data->apellido;
$nombre = $data->nombre;
$num_doc = $data->num_doc;
$email = $data->email;
$fecha_nac = $data->fecha_nac;

if ($id) {
	$query =
		"UPDATE postulantes SET
		apellido='$apellido', nombre='$nombre', num_doc='$num_doc', email='$email', fecha_nac='$fecha_nac'
		WHERE id=$id;";
	db::getInstance()->get_result($query);
	$result = db::getInstance()->get_result($query);
	echo json_encode(pg_fetch_array($result, null, PGSQL_ASSOC));
} else {
	header("HTTP/1.1 400 Bad Request");
	echo json_encode(["mensaje" => "No se puede actualizar un postulante sin el ID"]);
}
