<?php

namespace App;

use App\models\DbConnect;

class Router extends DbConnect
{
  protected array $routes;
  protected string $url;

  public function __construct(array $routes)
  {
    parent::__construct();
    $this->routes = $routes;
    $this->url = $_SERVER['REQUEST_URI'];

    $this->run();
  }

  protected function extractParams($url, $rule)
  {
    (array) $params = [];
    (array) $urlParts = explode('/', trim($url, '/'));
    (array) $ruleParts = explode('/', trim($rule, '/'));

    foreach ($ruleParts as $index => $rulePart) {
      if (strpos($rulePart, ':') === 0 && isset($urlParts[$index])) {
        $paramName = substr($rulePart, 1);
        $params[$paramName] = $urlParts[$index];
      }
    }

    return $params;
  }

  protected function matchRule($url, $rule)
  {
    (array) $urlParts = explode('/', trim($url, '/'));
    (array) $ruleParts = explode('/', trim($rule, '/'));

    if (count($urlParts) !== count($ruleParts)) {
      return false;
    }

    foreach ($ruleParts as $index => $rulePart) {
      if ($rulePart !== $urlParts[$index] && strpos($rulePart, ':') !== 0) {
        return false;
      }
    }

    return true;
  }

  protected function header()
  {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, DELETE, POST, GET, OPTIONS, PATCH');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, Api-Key');
    header('Content-type: application/json; charset=utf-8');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(200);
      exit;
    }
  }

  protected function startSession()
  {
    if (
      $apikey = $_SERVER['HTTP_API_KEY'] ?? false
    ) {
      session_id($apikey);
      session_start([
        'use_cookies' => 0
      ]);
      return true;
    }
  }

  protected function run()
  {
    $this->header();
    $is404 = true;
    (string) $url = parse_url($this->url, PHP_URL_PATH);

    foreach ($this->routes as $route => $controller) {
      if ($this->matchRule($url, $route)) {
        (array) $params = $this->extractParams($url, $route);
        $this->startSession();
        new $controller($params);
        $is404 = false;
      }
    }

    if ($is404) {
      http_response_code(404);
      echo json_encode([
        'code' => '404',
        'message' => 'Not Found'
      ]);
    }
  }
}
