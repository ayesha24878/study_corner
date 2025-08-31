<?php
// Simple PHP microservice placeholder (optional).
// Run with: php -S 127.0.0.1:8081
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
header('Content-Type: application/json');

if ($path === '/health') {
  echo json_encode(['ok' => true, 'service' => 'php-service']);
  exit;
}

if ($path === '/echo' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  echo json_encode(['received' => $data]);
  exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);
