<?php
// menu_import_form.php
// Форма загрузки меню для конкретного ресторана через GPT API

require __DIR__ . '/config.php';

$isEmbedded = isset($_GET['embedded']) && $_GET['embedded'] === '1';

// Загружаем список ресторанов для выпадающего списка
try {
    $stmt = $pdo->query("SELECT id, name, address FROM restaurants ORDER BY name ASC");
    $restaurants = $stmt->fetchAll();
} catch (PDOException $e) {
    http_response_code(500);
    echo "<p>Ошибка подключения к базе данных: " . htmlspecialchars($e->getMessage()) . "</p>";
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Импорт меню через GPT</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: <?php echo $isEmbedded ? 'transparent' : '#f6f6f6'; ?>;
            margin: 0;
            padding: <?php echo $isEmbedded ? '0' : '20px'; ?>;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: <?php echo $isEmbedded ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'; ?>;
            padding: 20px;
            border: <?php echo $isEmbedded ? '1px solid #e5e5e5' : 'none'; ?>;
        }
        h1 { margin-top: 0; }
        label { display: block; margin: 12px 0 6px; font-weight: bold; }
        input[type="text"], input[type="file"], select, textarea {
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }
        .help { color: #555; font-size: 13px; margin-top: 4px; }
        button {
            background: #007bff;
            color: #fff;
            border: none;
            padding: 12px 18px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 15px;
        }
        button:hover { background: #0056b3; }
        .note {
            background: #eef6ff;
            border-left: 4px solid #007bff;
            padding: 10px 12px;
            margin-top: 10px;
            border-radius: 6px;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Импорт меню ресторана (GPT)</h1>
    <p>Загрузите Word/PDF/TXT файл с меню, укажите ресторан и API-ключ OpenAI. Скрипт отправит содержимое файла в GPT и покажет предпросмотр блюд перед добавлением в БД.</p>

    <form action="menu_import_process.php" method="POST" enctype="multipart/form-data">
        <label for="restaurant_id">Ресторан</label>
        <select name="restaurant_id" id="restaurant_id" required>
            <option value="">-- Выберите ресторан --</option>
            <?php foreach ($restaurants as $r): ?>
                <option value="<?php echo (int)$r['id']; ?>">
                    <?php echo htmlspecialchars($r['name']); ?>
                    <?php if (!empty($r['address'])): ?>
                        (<?php echo htmlspecialchars($r['address']); ?>)
                    <?php endif; ?>
                </option>
            <?php endforeach; ?>
        </select>
        <div class="help">Список загружается из таблицы <strong>restaurants</strong>.</div>

        <label for="menu_file">Файл меню (doc, docx, pdf, txt)</label>
        <input type="file" name="menu_file" id="menu_file" accept=".doc,.docx,.pdf,.txt,.rtf" required>
        <div class="help">Файл временно сохраняется на сервере только для отправки в GPT и удаляется после обработки.</div>

        <label for="openai_api_key">OpenAI API Key</label>
        <input type="text" name="openai_api_key" id="openai_api_key" placeholder="sk-..." required>
        <div class="help">Ключ не сохраняется в базе. Используется только для одного запроса к GPT.</div>

        <label for="model">Модель (по умолчанию gpt-4o-mini)</label>
        <input type="text" name="model" id="model" value="gpt-4o-mini">

        <label for="extra_prompt">Дополнительные подсказки (опционально)</label>
        <textarea name="extra_prompt" id="extra_prompt" rows="3" placeholder="Например: цены в евро, время приготовления в минутах, категории: закуски/горячее/десерты"></textarea>

        <div class="note">
            <strong>Как работает импорт:</strong>
            <ol>
                <li>Файл отправляется в GPT вместе с инструкцией извлечь блюда.</li>
                <li>Вы увидите таблицу с распознанными блюдами.</li>
                <li>После подтверждения записи добавятся в таблицы <code>dishes</code> и <code>restaurant_dishes</code>.</li>
            </ol>
        </div>

        <br>
        <button type="submit">Отправить в GPT и показать предпросмотр</button>
    </form>
</div>
</body>
</html>