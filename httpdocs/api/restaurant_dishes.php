<?php
// restaurant_dishes.php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/config.php';

if (!isset($_GET['restaurant_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'restaurant_id is required'], JSON_UNESCAPED_UNICODE);
    exit;
}

$restaurant_id = (int)$_GET['restaurant_id'];

$sql = "
    SELECT d.*
    FROM dishes d
    INNER JOIN restaurant_dishes rd ON rd.dish_id = d.id
    WHERE rd.restaurant_id = :rid
    ORDER BY d.name
";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':rid' => $restaurant_id]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error"   => "SQL error",
        "details" => $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$dishes = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $row['id']    = isset($row['id'])    ? (int)$row['id']    : null;
    $row['price'] = isset($row['price']) ? (float)$row['price'] : 0.0;
    $dishes[] = $row;
}

echo json_encode($dishes, JSON_UNESCAPED_UNICODE);
