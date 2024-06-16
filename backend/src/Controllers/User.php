<?php

namespace App\Controllers;

use App\models\UsersModels;

class User
{
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params)
  {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new UsersModels();

    $this->run();
  }

  protected function getUser()
  {
    if (
      isset($_SESSION)
      && !empty($_SESSION['user'])
      && !empty($this->params['mode'])
      && !empty($this->params['by'])
      && $mode = $this->models->getMethode($this->params['mode'], $this->params['by'], $this->reqMethod)
    ) {
      return $this->$mode($this->models->$mode($this->params['id']));
    }

    http_response_code(403);
    return array('error' => 'not connected');
  }

  protected function patchUser()
  {
    if (
      isset($_SESSION)
      && !empty($_SESSION['user'])
      && !empty($this->params['mode'])
      && !empty($this->params['by'])
      && $mode = $this->models->getMethode($this->params['mode'], $this->params['by'], $this->reqMethod)
    ) {
      return $this->$mode($this->models->$mode($this->params['id']));
    }

    http_response_code(403);
    return array('error' => 'not connected');
  }

  protected function patchColocCurrent($patch)
  {
    http_response_code($patch ? 200 : 403);
    return array('success' => $patch);
  }

  protected function getSearchName($data)
  {
    http_response_code(200);
    return $data;
  }

  protected function getColocCurrent($data)
  {
    http_response_code($data ? 200 : 403);
    $_SESSION['user']['current_coloc'] = $data['current_coloc'];
    return array('success' => $data);
  }

  protected function patchEditEmail($data)
  {
    http_response_code($data ? 200 : 403);
    return array('success' => $data);
  }

  protected function patchEditPassword($data)
  {
    http_response_code($data ? 200 : 403);
    return array('success' => $data);
  }

  protected function patchEditName($data)
  {
    http_response_code($data ? 200 : 403);
    return array('success' => $data);
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'User';

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
