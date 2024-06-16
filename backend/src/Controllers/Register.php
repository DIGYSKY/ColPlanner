<?php

namespace App\Controllers;

use App\models\UsersModels;

class Register {
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params) {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new UsersModels();

    $this->run();
  }

  protected function postRegister() {
    return $this->models->postRegister();
  }

  protected function ifMethodExist() {
    $method = $this->reqMethod.'Register';

    if (method_exists($this, $method)) {
      $response = $this->$method();
      echo json_encode($response);

      return;
    }

    echo json_encode([
      'code' => '404',
      'message' => 'Not Found'
    ]);

    http_response_code(404);

    return;
  }

  protected function run() {
    $this->ifMethodExist();
  }
}
