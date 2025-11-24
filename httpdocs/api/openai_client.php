<?php
// openai_client.php — минимальный клиент для вызова Chat Completions с файлом меню
// Используется только в menu_import_process.php. Не сохраняет API-ключ, все параметры передаются напрямую.

/**
 * Отправка файла меню в GPT для извлечения блюд.
 *
 * @param string $apiKey          OpenAI API key
 * @param string $filePath        Путь до загруженного файла меню
 * @param string $restaurantName  Название ресторана (для контекста)
 * @param string $model           Модель OpenAI (по умолчанию gpt-4o-mini)
 * @param string $extraPrompt     Дополнительные инструкции (опционально)
 * @return array                  Ассоциативный массив с ключами success, content, raw_response
 */
function callOpenAiMenuParser(
    string $apiKey,
    string $filePath,
    string $restaurantName = '',
    string $model = 'gpt-4o-mini',
    string $extraPrompt = ''
): array {
    if (!is_readable($filePath)) {
        return [
            'success' => false,
            'error'   => 'Не удалось прочитать загруженный файл',
        ];
    }

    $fileContent = file_get_contents($filePath);
    if ($fileContent === false) {
        return [
            'success' => false,
            'error'   => 'Ошибка чтения файла',
        ];
    }

    $mime   = mime_content_type($filePath) ?: 'application/octet-stream';
    $base64 = base64_encode($fileContent);

    // Базовая системная инструкция — просим вернуть только JSON по заранее описанной схеме
    $systemMessage = <<<PROMPT
Вы — ассистент, который извлекает меню ресторана из предоставленного файла.
Верните ТОЛЬКО JSON без текста вокруг в формате:
{
  "dishes": [
    {
      "name": "Название блюда",
      "category": "Категория/секция меню",
      "price": 12.50,               // только число, без валюты; если нет цены — null
      "description": "Краткое описание",
      "ingredients": "Основные ингредиенты (опционально)",
      "time_to_prepare": "Время приготовления (опционально)",
      "image_url": "URL картинки (если есть)"
    }
  ]
}
Если данные отсутствуют — ставьте null или пустую строку. Не выдумывайте цены.
PROMPT;

    $userMessage = "Название ресторана: " . ($restaurantName ?: 'не указано') . "\n" .
        "Файл передан в Base64 вместе с MIME-типом. Извлеките все блюда, цены, категории и описания. " .
        "Если валюта указана, уберите символ валюты и оставьте только число. " .
        "Если блюдо повторяется, сохраняйте одну запись.";

    if ($extraPrompt !== '') {
        $userMessage .= "\nДополнительные пожелания: " . $extraPrompt;
    }

    // Используем новое поле content с типом text — передаём base64 файла
    $payload = [
        'model' => $model ?: 'gpt-4o-mini',
        'messages' => [
            ['role' => 'system', 'content' => $systemMessage],
            [
                'role'    => 'user',
                'content' => [
                    ['type' => 'text', 'text' => $userMessage],
                    ['type' => 'text', 'text' => "MIME: {$mime}"],
                    ['type' => 'text', 'text' => "BASE64:\n{$base64}"],
                ],
            ],
        ],
        'temperature' => 0.2,
    ];

    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey,
        ],
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        CURLOPT_TIMEOUT        => 120,
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        $error = curl_error($ch);
        curl_close($ch);
        return [
            'success' => false,
            'error'   => 'Сетевая ошибка cURL: ' . $error,
        ];
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $decoded = json_decode($response, true);
    if ($httpCode >= 400) {
        $message = $decoded['error']['message'] ?? ('HTTP ' . $httpCode);
        return [
            'success' => false,
            'error'   => 'Ошибка OpenAI API: ' . $message,
            'raw_response' => $decoded,
        ];
    }

    $content = $decoded['choices'][0]['message']['content'] ?? '';

    return [
        'success'      => true,
        'content'      => $content,
        'raw_response' => $decoded,
    ];
}