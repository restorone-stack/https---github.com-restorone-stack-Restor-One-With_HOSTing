<?php
// restaurants.php — БЕЗ онлайн-геокодирования
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/config.php'; // здесь должен создаваться $pdo (PDO)

if (!isset($pdo) || !($pdo instanceof PDO)) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection not configured'], JSON_UNESCAPED_UNICODE);
    exit;
}

// на всякий случай включаем выброс исключений
try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Throwable $e) {
    // если не получилось — просто продолжаем, это не критично
}

// Параметры для будущего (фильтрация по границам карты)
$minLat = filter_input(INPUT_GET, 'minLat', FILTER_VALIDATE_FLOAT);
$maxLat = filter_input(INPUT_GET, 'maxLat', FILTER_VALIDATE_FLOAT);
$minLng = filter_input(INPUT_GET, 'minLng', FILTER_VALIDATE_FLOAT);
$maxLng = filter_input(INPUT_GET, 'maxLng', FILTER_VALIDATE_FLOAT);

$sql    = "SELECT * FROM restaurants";
$where  = [];
$params = [];

// Если все четыре параметра корректны — фильтруем по прямоугольнику
if ($minLat !== false && $maxLat !== false && $minLng !== false && $maxLng !== false &&
    $minLat !== null && $maxLat !== null && $minLng !== null && $maxLng !== null) {

    $where[] = "latitude IS NOT NULL AND longitude IS NOT NULL
                AND latitude BETWEEN :minLat AND :maxLat
                AND longitude BETWEEN :minLng AND :maxLng";

    $params[':minLat'] = $minLat;
    $params[':maxLat'] = $maxLat;
    $params[':minLng'] = $minLng;
    $params[':maxLng'] = $maxLng;
} else {
    // по умолчанию — отсекаем записи без координат, чтобы не ломать карту
    $where[] = "latitude IS NOT NULL AND longitude IS NOT NULL";
}

if ($where) {
    $sql .= ' WHERE ' . implode(' AND ', $where);
}

// безопасный лимит — чтобы не отдавать бесконечный список
$sql .= ' ORDER BY id ASC LIMIT 1000';

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'DB query failed',
        'message' => $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
}
