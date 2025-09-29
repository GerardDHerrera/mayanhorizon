<?php
// apiPropiedades.php

// --- Configuración de la Base de Datos (usando camelCase) ---
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = ''; // Asume una contraseña vacía para un entorno de desarrollo local. ¡Cámbiala en producción!
$dbName = 'mayanhorizon'; // Actualizado según la solicitud

// --- Cabeceras para la respuesta JSON ---
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite el acceso desde cualquier origen (ajustar en producción por seguridad)

// --- Conexión a la Base de Datos ---
try {
    // Se utiliza PDO para una conexión más segura y versátil
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8", $dbUser, $dbPass);

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