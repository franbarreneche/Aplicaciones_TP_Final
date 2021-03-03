<?php
require '../db.php';

header('Access-Control-Allow-Methods: PUT');

// Takes raw data from the request
$json = file_get_contents('php://input');
// Converts it into a PHP object
$data = json_decode($json);

$id = $data->id;
$puesto_id = $data->puesto_id;
$justificacion = $data->justificacion;

if ($id) {
	$query =
		"UPDATE postulantes SET
		puesto_id='$puesto_id', justificacion='$justificacion'
		WHERE id=$id;";
	db::getInstance()->get_result($query);
	$result = db::getInstance()->get_result($query);
	echo json_encode(pg_fetch_array($result, null, PGSQL_ASSOC));
} else {
	header("HTTP/1.1 400 Bad Request");
	echo json_encode(["mensaje" => "No se puede actualizar un postulante sin el ID"]);
}