<?php

// Recupera el JSON que se envió por POST.
$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;

// Lo decodea.
$objJson = json_decode($cadenaJSON);    


$extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);


// Obtiene la fecha.
$fecha=date("Gis");


// Obviene el detino, que es donde se va a guardar.
//  fotos/ + nombre + fecha + extension.
$destino = "fotos/". $objJson->nombre ."." . $fecha. "." . $extension;


$objJson->pathFoto= $objJson->nombre ."." . $fecha. "." . $extension;


$cadenaJSON2=json_encode($objJson);

$ar = fopen("./perro.json", "a");
$cant = fwrite($ar, $cadenaJSON2 . "\r\n");
fclose($ar);


$objRetorno= new stdClass();
$objRetorno->Ok= false; 
$objRetorno->pathFoto=$destino;


if(move_uploaded_file($_FILES["foto"]["tmp_name"],$destino))
{
    $objRetorno->Ok=true;
}

echo json_encode($objRetorno);


?>