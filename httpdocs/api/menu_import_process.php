<?php
// menu_import_process.php — отправка файла в GPT, предпросмотр и вставка в БД

header('Content-Type: text/html; charset=utf-8');

require __DIR__ . '/config.php';
require __DIR__ . '/openai_client.php';

// Утилита: убираем Markdown-ограждения ```json ... ```
function cleanupJsonString(string $content): string {
    $trimmed = trim($content);
    if (strpos($trimmed, '```') === 0) {
        // удаляем первую строчку ```json и последний ```
        $trimmed = preg_replace('/^```[a-zA-Z]*\n|```$/m', '', $trimmed);
        $trimmed = trim($trimmed);
    }
    return $trimmed;
}

// Утилита: приводим блюдо к аккуратному виду
function normalizeDish(array $dish): array {
    $normalized = [
        'name'             => trim($dish['name'] ?? ''),
        'category'         => trim($dish['category'] ?? ''),
        'price'            => $dish['price'] ?? null,
        'description'      => trim($dish['description'] ?? ''),
        'ingredients'      => trim($dish['ingredients'] ?? ''),
        'time_to_prepare'  => trim($dish['time_to_prepare'] ?? ''),
        'image_url'        => trim($dish['image_url'] ?? ''),
    ];

    // цена только число или null
    if ($normalized['price'] === '' || $normalized['price'] === null) {
        $normalized['price'] = null;
    } else {
        $normalized['price'] = (float)$normalized['price'];
    }

    return $normalized;
}

function renderError(string $message): void {
    echo '<div style="max-width:800px;margin:20px auto;font-family:Arial;">';
    echo '<h2>Ошибка</h2>';
    echo '<p style="color:#c00;">' . htmlspecialchars($message) . '</p>';
    echo '<p><a href="menu_import_form.php">Вернуться к форме</a></p>';
    echo '</div>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: menu_import_form.php');
    exit;
}

// Если пришло подтверждение — добавляем в БД
if (isset($_POST['confirm']) && $_POST['confirm'] === '1') {
    $restaurantId = (int)($_POST['restaurant_id'] ?? 0);
    $payloadJson  = $_POST['parsed_json'] ?? '';

    if ($restaurantId <= 0 || $payloadJson === '') {
        renderError('Не переданы данные для сохранения.');
    }

    $decoded = json_decode($payloadJson, true);
    if (!is_array($decoded) || !isset($decoded['dishes']) || !is_array($decoded['dishes'])) {
        renderError('Неверный формат данных для сохранения.');
    }

    try {
        // Проверяем, что ресторан существует
        $stmt = $pdo->prepare('SELECT id, name FROM restaurants WHERE id = :id');
        $stmt->execute([':id' => $restaurantId]);
        $restaurant = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$restaurant) {
            renderError('Ресторан не найден.');
        }
    } catch (PDOException $e) {
        renderError('Ошибка чтения ресторана: ' . $e->getMessage());
    }

    $dishes = array_map('normalizeDish', $decoded['dishes']);

    try {
        $pdo->beginTransaction();

        $insertDishSql = 'INSERT INTO dishes (name, category, price, description, ingredients, time_to_prepare, image_url)
                           VALUES (:name, :category, :price, :description, :ingredients, :time_to_prepare, :image_url)';
        $insertDishStmt = $pdo->prepare($insertDishSql);

        $linkSql = 'INSERT INTO restaurant_dishes (restaurant_id, dish_id) VALUES (:restaurant_id, :dish_id)';
        $linkStmt = $pdo->prepare($linkSql);
        $linkExistsSql = 'SELECT 1 FROM restaurant_dishes WHERE restaurant_id = :restaurant_id AND dish_id = :dish_id LIMIT 1';
        $linkExistsStmt = $pdo->prepare($linkExistsSql);

        $findExistingSql = 'SELECT d.id
                             FROM dishes d
                             INNER JOIN restaurant_dishes rd ON d.id = rd.dish_id
                             WHERE rd.restaurant_id = :restaurant_id AND d.name = :name
                             LIMIT 1';
        $findExistingStmt = $pdo->prepare($findExistingSql);

        foreach ($dishes as $dish) {
            if ($dish['name'] === '') {
                // пропускаем пустые
                continue;
            }

            // Проверяем, есть ли уже блюдо с таким названием в ресторане
            $findExistingStmt->execute([
                ':restaurant_id' => $restaurantId,
                ':name'          => $dish['name'],
            ]);
            $existingId = $findExistingStmt->fetchColumn();

            if ($existingId) {
                $dishId = (int)$existingId;
            } else {
                // Вставляем новое блюдо
                $insertDishStmt->execute([
                    ':name'            => $dish['name'],
                    ':category'        => $dish['category'] ?: null,
                    ':price'           => $dish['price'],
                    ':description'     => $dish['description'] ?: null,
                    ':ingredients'     => $dish['ingredients'] ?: null,
                    ':time_to_prepare' => $dish['time_to_prepare'] ?: null,
                    ':image_url'       => $dish['image_url'] ?: null,
                ]);
                $dishId = (int)$pdo->lastInsertId();
            }

            // Создаём связь ресторан-блюдо, если её ещё нет
            $linkExistsStmt->execute([
                ':restaurant_id' => $restaurantId,
                ':dish_id'       => $dishId,
            ]);
            $linkAlreadyExists = $linkExistsStmt->fetchColumn();

            if (!$linkAlreadyExists) {
                $linkStmt->execute([
                    ':restaurant_id' => $restaurantId,
                    ':dish_id'       => $dishId,
                ]);
            }
        }

        $pdo->commit();
    } catch (PDOException $e) {
        $pdo->rollBack();
        renderError('Ошибка сохранения в БД: ' . $e->getMessage());
    }

    echo '<div style="max-width:900px;margin:20px auto;font-family:Arial;">';
    echo '<h2>Импорт завершён</h2>';
    echo '<p>Блюда успешно привязаны к ресторану: <strong>' . htmlspecialchars($restaurant['name']) . '</strong>.</p>';
    echo '<p><a href="menu_import_form.php">Импортировать ещё</a></p>';
    echo '</div>';
    exit;
}

// Этап 1: отправка файла в GPT и предпросмотр
$restaurantId  = (int)($_POST['restaurant_id'] ?? 0);
$openAiApiKey  = trim($_POST['openai_api_key'] ?? '');
$model         = trim($_POST['model'] ?? 'gpt-4o-mini');
$extraPrompt   = trim($_POST['extra_prompt'] ?? '');

if ($restaurantId <= 0) {
    renderError('Не выбран ресторан.');
}
if ($openAiApiKey === '') {
    renderError('Не указан OpenAI API Key.');
}
if (!isset($_FILES['menu_file']) || $_FILES['menu_file']['error'] !== UPLOAD_ERR_OK) {
    renderError('Файл меню не загружен или произошла ошибка загрузки.');
}

// Получаем данные ресторана
try {
    $stmt = $pdo->prepare('SELECT id, name FROM restaurants WHERE id = :id');
    $stmt->execute([':id' => $restaurantId]);
    $restaurant = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$restaurant) {
        renderError('Ресторан не найден.');
    }
} catch (PDOException $e) {
    renderError('Ошибка получения ресторана: ' . $e->getMessage());
}

$allowedExt = ['doc', 'docx', 'pdf', 'txt', 'rtf'];
$uploadDir  = __DIR__ . '/tmp';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$originalName = $_FILES['menu_file']['name'];
$ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
if (!in_array($ext, $allowedExt, true)) {
    renderError('Недопустимое расширение файла. Разрешены: ' . implode(', ', $allowedExt));
}

$targetPath = $uploadDir . '/' . uniqid('menu_', true) . '.' . $ext;
if (!move_uploaded_file($_FILES['menu_file']['tmp_name'], $targetPath)) {
    renderError('Не удалось сохранить загруженный файл.');
}

// Отправляем файл в OpenAI API
$result = callOpenAiMenuParser($openAiApiKey, $targetPath, $restaurant['name'], $model, $extraPrompt);
@unlink($targetPath); // удаляем временный файл

if (!$result['success']) {
    $err = $result['error'] ?? 'Неизвестная ошибка OpenAI';
    renderError($err);
}

$rawContent = $result['content'] ?? '';
$cleanJson  = cleanupJsonString($rawContent);
$decoded    = json_decode($cleanJson, true);

if (!is_array($decoded) || !isset($decoded['dishes']) || !is_array($decoded['dishes'])) {
    renderError('Не удалось распознать JSON от GPT. Проверьте промпт или файл меню.');
}

$previewDishes = [];
foreach ($decoded['dishes'] as $dish) {
    $normalized = normalizeDish(is_array($dish) ? $dish : []);
    if ($normalized['name'] === '') {
        continue;
    }
    $previewDishes[] = $normalized;
}

if (empty($previewDishes)) {
    renderError('GPT не вернул ни одного блюда. Попробуйте уточнить подсказку.');
}

$payloadForSave = [
    'dishes' => $previewDishes,
];

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Предпросмотр меню</title>
    <style>
        body { font-family: Arial, sans-serif; background:#f6f6f6; padding:20px; }
        .container { max-width: 1100px; margin:0 auto; background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); }
        table { width:100%; border-collapse: collapse; margin-top:15px; }
        th, td { border:1px solid #ddd; padding:8px; vertical-align: top; }
        th { background:#f0f0f0; }
        .actions { margin-top: 20px; }
        .btn { display:inline-block; padding:10px 16px; border-radius:6px; text-decoration:none; color:#fff; background:#28a745; }
        .btn-secondary { background:#6c757d; margin-left:10px; }
        pre { background:#f8f8f8; padding:10px; border-radius:6px; overflow-x:auto; }
    </style>
</head>
<body>
<div class="container">
    <h2>Предпросмотр блюд для ресторана: <?php echo htmlspecialchars($restaurant['name']); ?></h2>
    <p>Проверьте данные, при необходимости вернитесь назад и подредактируйте файл или подсказку.</p>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Название</th>
                <th>Категория</th>
                <th>Цена</th>
                <th>Описание</th>
                <th>Ингредиенты</th>
                <th>Время приготовления</th>
                <th>Изображение</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($previewDishes as $idx => $dish): ?>
            <tr>
                <td><?php echo $idx + 1; ?></td>
                <td><?php echo htmlspecialchars($dish['name']); ?></td>
                <td><?php echo htmlspecialchars($dish['category']); ?></td>
                <td><?php echo $dish['price'] !== null ? number_format((float)$dish['price'], 2, '.', ' ') : '—'; ?></td>
                <td><?php echo nl2br(htmlspecialchars($dish['description'])); ?></td>
                <td><?php echo nl2br(htmlspecialchars($dish['ingredients'])); ?></td>
                <td><?php echo htmlspecialchars($dish['time_to_prepare']); ?></td>
                <td><?php echo htmlspecialchars($dish['image_url']); ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>

    <div class="actions">
        <form method="POST" action="menu_import_process.php">
            <input type="hidden" name="confirm" value="1">
            <input type="hidden" name="restaurant_id" value="<?php echo (int)$restaurantId; ?>">
            <input type="hidden" name="parsed_json" value='<?php echo json_encode($payloadForSave, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT); ?>'>
            <button type="submit" class="btn">Подтвердить импорт</button>
            <a class="btn btn-secondary" href="menu_import_form.php">Назад к форме</a>
        </form>
    </div>

    <h3>Сырой ответ GPT</h3>
    <pre><?php echo htmlspecialchars($cleanJson); ?></pre>
</div>
</body>
</html>