<?php
// api_propiedades.php

// --- Configuración de la Base de Datos ---
$db_host = 'localhost';
$db_user = 'root';
$db_pass = ''; // Asume una contraseña vacía para un entorno de desarrollo local. ¡Cámbiala en producción!
$db_name = 'mayanhorizon_db';

// --- Cabeceras para la respuesta JSON ---
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite el acceso desde cualquier origen (ajustar en producción por seguridad)

// --- Conexión a la Base de Datos ---
try {
    // Se utiliza PDO para una conexión más segura y versátil
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);

    // Configurar PDO para que lance excepciones en caso de error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    // Si la conexión falla, se envía una respuesta de error en JSON
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'error' => 'Error de conexión a la base de datos.',
        'message' => $e->getMessage()
    ]);
    exit; // Termina la ejecución del script
}

// --- Consulta de Propiedades ---
try {
    // Prepara y ejecuta la consulta para obtener todas las propiedades
    $stmt = $pdo->query("SELECT * FROM propiedades");

    // Obtiene todos los resultados como un array asociativo
    $propiedades = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devuelve los resultados en formato JSON
    echo json_encode($propiedades);

} catch (PDOException $e) {
    // Si la consulta falla, se envía una respuesta de error
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al consultar las propiedades.',
        'message' => $e->getMessage()
    ]);
}

// Cierra la conexión
$pdo = null;
?>