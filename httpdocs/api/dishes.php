<?php
// dishes.php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/config.php';

// Если запрошено конкретное блюдо по id
if (isset($_GET['id'])) {
    $id = (int)$_GET['id'];

    $sql = "
        SELECT d.*,
               GROUP_CONCAT(rd.restaurant_id) AS restaurant_ids
        FROM dishes d
        LEFT JOIN restaurant_dishes rd ON d.id = rd.dish_id
        WHERE d.id = :id
        GROUP BY d.id
    ";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "error"   => "SQL error",
            "details" => $e->getMessage(),
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!$row) {
        http_response_code(404);
        echo json_encode(["error" => "Dish not found"], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Преобразуем restaurants
    if (!empty($row['restaurant_ids'])) {
        $restaurants = array_map('intval', explode(',', $row['restaurant_ids']));
    } else {
        $restaurants = [];
    }
    unset($row['restaurant_ids']);

    // типы
    $row['id']    = isset($row['id'])    ? (int)$row['id']    : null;
    $row['price'] = isset($row['price']) ? (float)$row['price'] : 0.0;

    $row['restaurants'] = $restaurants;

    echo json_encode($row, JSON_UNESCAPED_UNICODE);
    exit;
}

// Иначе — все блюда
$sql = "
    SELECT d.*,
           GROUP_CONCAT(rd.restaurant_id) AS restaurant_ids
    FROM dishes d
    LEFT JOIN restaurant_dishes rd ON d.id = rd.dish_id
    GROUP BY d.id
";

try {
    $stmt = $pdo->query($sql);
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
    if (!empty($row['restaurant_ids'])) {
        $restaurants = array_map('intval', explode(',', $row['restaurant_ids']));
    } else {
        $restaurants = [];
    }
    unset($row['restaurant_ids']);

    $row['id']    = isset($row['id'])    ? (int)$row['id']    : null;
    $row['price'] = isset($row['price']) ? (float)$row['price'] : 0.0;

    $row['restaurants'] = $restaurants;

    $dishes[] = $row;
}

echo json_encode($dishes, JSON_UNESCAPED_UNICODE);
