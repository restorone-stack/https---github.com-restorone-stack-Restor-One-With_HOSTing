<?php
// geocode_fill.php — разовое/пакетное заполнение координат для ресторанов
// ЗАПУСКАТЬ ТОЛЬКО АДМИНУ (через CLI или под паролем), НЕ ОСТАВЛЯТЬ ОТКРЫТЫМ!

header('Content-Type: text/plain; charset=utf-8');

require __DIR__ . '/config.php';

if (!isset($pdo) || !($pdo instanceof PDO)) {
    echo "DB connection not configured\n";
    exit;
}

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/**
 * Нормализация адреса: обрезаем пробелы, убираем дубли, при необходимости дописываем город/страну.
 */
function normalizeAddress(string $address): string
{
    $address = trim($address);
    $address = preg_replace('~\s+~u', ' ', $address);

    // если нет слова "Казахстан" — допишем
    if (mb_stripos($address, 'казахстан') === false) {
        $address .= ', Казахстан';
    }

    return $address;
}

/**
 * Геокодирование через Nominatim (OpenStreetMap).
 * ВАЖНО: не злоупотреблять (не спамить запросами).
 */
function geocodeAddress(string $address): ?array
{
    if ($address === '' || mb_strlen($address) < 5) {
        return null;
    }

    $query = http_build_query([
        'q'               => $address,
        'format'          => 'json',
        'addressdetails'  => 0,
        'limit'           => 1,
        'accept-language' => 'ru',
    ]);

    $url = "https://nominatim.openstreetmap.org/search?" . $query;

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 5,
        CURLOPT_USERAGENT      => 'RestorOne-Geocoder/1.0 (+https://restor-one.com)',
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        curl_close($ch);
        return null;
    }

    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($code !== 200) {
        return null;
    }

    $json = json_decode($response, true);
    if (!is_array($json) || empty($json[0])) {
        return null;
    }

    return [
        'lat' => isset($json[0]['lat']) ? (float)$json[0]['lat'] : null,
        'lon' => isset($json[0]['lon']) ? (float)$json[0]['lon'] : null,
    ];
}

// Сколько записей обрабатывать за один запуск
$batchSize = 30;

$stmt = $pdo->prepare("
    SELECT id, name, address
    FROM restaurants
    WHERE (latitude IS NULL OR longitude IS NULL)
      AND address IS NOT NULL
      AND address <> ''
    LIMIT :limit
");
$stmt->bindValue(':limit', $batchSize, PDO::PARAM_INT);
$stmt->execute();

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$rows) {
    echo "Нет записей без координат. Всё уже заполнено.\n";
    exit;
}

echo "Найдено " . count($rows) . " записей без координат. Обрабатываем...\n\n";

$update = $pdo->prepare("UPDATE restaurants SET latitude = :lat, longitude = :lng WHERE id = :id");

foreach ($rows as $row) {
    $id      = (int)$row['id'];
    $address = normalizeAddress($row['address']);

    echo "ID {$id}: {$row['name']} — {$address}\n";

    $coords = geocodeAddress($address);
    if (!$coords || $coords['lat'] === null || $coords['lon'] === null) {
        echo "  → координаты не найдены\n\n";
        // небольшая пауза, чтобы не спамить сервис
        sleep(1);
        continue;
    }

    $update->execute([
        ':lat' => $coords['lat'],
        ':lng' => $coords['lon'],
        ':id'  => $id,
    ]);

    echo "  → OK: lat={$coords['lat']}, lon={$coords['lon']}\n\n";

    // Важно: пауза между запросами, чтобы не блокнули по rate limit
    sleep(1);
}

echo "Готово.\n";
