<?php
// config.php — подключение к MySQL через PDO

$host = "localhost";
$user = "p-353140_restor_one_user";
$pass = "23june1970";   // твой пароль
$db   = "p-353140_restor_one_db";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // ошибки как исключения
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // fetch_assoc по умолчанию
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        "error"   => "DB connection failed",
        "details" => $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
