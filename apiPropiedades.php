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
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión a la base de datos.', 'message' => $e->getMessage()]);
    exit;
}

// --- Consulta de Propiedades con Alias para camelCase ---
try {
    // Se usan alias (AS) para que los nombres de las columnas en el JSON salgan en camelCase.
    $sql = "
        SELECT
            id,
            id_cliente AS idCliente,
            tipo_propiedad AS tipoPropiedad,
            titulo,
            descripcion,
            precio,
            moneda,
            m2,
            region,
            manzana,
            lote,
            latitud,
            longitud,
            estatus,
            fecha_creacion AS fechaCreacion
        FROM propiedades
    ";

    $stmt = $pdo->query($sql);
    $propiedades = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devuelve los resultados en formato JSON
    echo json_encode($propiedades);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al consultar las propiedades.', 'message' => $e->getMessage()]);
}

// Cierra la conexión
$pdo = null;
?>