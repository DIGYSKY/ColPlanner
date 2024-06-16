<?php

namespace App\Controllers;

use App\models\ColocUserModels;

class ColocUser
{
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params)
  {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new ColocUserModels();

    $this->run();
  }

  protected function getMethode()
  {
    if (
      isset($_SESSION)
      && !empty($_SESSION['user'])
      && !empty($this->params['mode'])
      && $methode = $this->models->getMethode($this->params['mode'], $this->reqMethod)
    ) {
      return $this->$methode($this->models->$methode($this->params['id']));
    }

    http_response_code(403);
    return array('error' => 'not conneced');
  }

  protected function deleteColocUser()
  {
    return $this->getMethode();
  }

  protected function postColocUser()
  {
    return $this->getMethode();
  }

  protected function deleteUser($return)
  {
    http_response_code($return ? 200 : 500);
    return array('success' => $return);
  }

  protected function postAdd($return)
  {
    http_response_code($return ? 200 : 500);
    return array('success' => $return);
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'ColocUser';

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
