<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$rawBody = file_get_contents('php://input');
$decoded = json_decode($rawBody ?: '{}', true);

if (!is_array($decoded)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid JSON payload.']);
    exit;
}

function normalize_string(mixed $value): string
{
    return is_string($value) ? trim($value) : '';
}

$payload = [
    'name' => normalize_string($decoded['name'] ?? null),
    'email' => normalize_string($decoded['email'] ?? null),
    'role' => normalize_string($decoded['role'] ?? null),
    'location' => normalize_string($decoded['location'] ?? null),
];

$allowedRoles = ['Student', 'Professional', 'Executive', 'Entrepreneur'];
$errors = [];

if ($payload['name'] === '') {
    $errors['name'] = 'Name is required.';
} elseif (mb_strlen($payload['name']) < 2) {
    $errors['name'] = 'Enter at least 2 characters for name.';
} elseif (mb_strlen($payload['name']) > 80) {
    $errors['name'] = 'Name should be 80 characters or fewer.';
}

if ($payload['email'] === '') {
    $errors['email'] = 'Email is required.';
} elseif (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Enter a valid email address.';
}

if ($payload['role'] === '') {
    $errors['role'] = 'Please choose your role.';
} elseif (!in_array($payload['role'], $allowedRoles, true)) {
    $errors['role'] = 'Please select a valid membership tier.';
}

if ($payload['location'] === '') {
    $errors['location'] = 'Location is required.';
} elseif (mb_strlen($payload['location']) < 2) {
    $errors['location'] = 'Enter at least 2 characters for location.';
} elseif (mb_strlen($payload['location']) > 120) {
    $errors['location'] = 'Location should be 120 characters or fewer.';
}

if ($errors !== []) {
    http_response_code(400);
    echo json_encode([
        'message' => 'Please fix the highlighted fields and try again.',
        'errors' => $errors,
    ]);
    exit;
}

$submission = $payload;
$submission['submittedAt'] = gmdate('c');

$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0775, true);
}

$line = json_encode($submission, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if ($line === false) {
    http_response_code(500);
    echo json_encode(['message' => 'Unable to encode submission data.']);
    exit;
}

$target = $dataDir . DIRECTORY_SEPARATOR . 'membership-submissions.jsonl';
$writeResult = file_put_contents($target, $line . PHP_EOL, FILE_APPEND | LOCK_EX);

if ($writeResult === false) {
    http_response_code(500);
    echo json_encode(['message' => 'Unable to save submission.']);
    exit;
}

http_response_code(201);
echo json_encode([
    'message' => 'Membership submission received.',
    'submission' => $submission,
]);

