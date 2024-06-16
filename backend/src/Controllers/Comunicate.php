<?php

namespace App\Controllers;

use App\models\ComunicateModels;

class Comunicate
{
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params)
  {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new ComunicateModels();

    $this->run();
  }

  protected function getComunicate()
  {
    if (
      $_SESSION['user']
      && !empty($this->params['id'])
    ) {
      $comunicates = $this->models->getComunicates($this->params['id']);
    } else {
      $comunicates = false;
    }

    http_response_code($comunicates !== false ? 200 : 400);
    return $comunicates;
  }

  protected function postComunicate()
  {
    if ($_SESSION['user']) {
      $inputJSON = file_get_contents('php://input');
      $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
      $comunicate = $this->models->postComunicate($input, $this->params['id']);
    } else {
      $comunicate = false;
    }

    http_response_code($comunicate ? 200 : 400);
    return $comunicate;
  }

  protected function deleteComunicate()
  {
    if (
      $_SESSION['user']
      && !empty($this->params['id'])
    ) {
      $comunicate = $this->models->deleteComunicate($this->params['id']);
    } else {
      $comunicate = false;
    }

    http_response_code($comunicate ? 200 : 400);
    return $comunicate;
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'Comunicate';

    if (method_exists($this, $method)) {
      $response = $this->$method();
      echo json_encode($response);

      return;
    }

    http_response_code(404);
    echo json_encode([
      'code' => '404',
      'message' => 'Not Found'
    ]);

    http_response_code(404);

    return;
  }

  protected function run()
  {
    $this->ifMethodExist();
  }
}
