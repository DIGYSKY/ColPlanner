<?php

namespace App\Controllers;

use App\models\InvitationModels;

class Invitation
{
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params)
  {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new InvitationModels();

    $this->run();
  }

  protected function postInvitation()
  {
    if (isset($_SESSION) && isset($_SESSION['user']['id'])) {
      return $this->models->postInvitation();
    }

    http_response_code(401);
    return array('error' => 'Unauthorized');
  }

  protected function getInvitation()
  {
    if (isset($_SESSION) && isset($_SESSION['user']['id'])) {
      return $this->models->getInvitation();
    }

    http_response_code(401);
    return array('error' => 'Unauthorized');
  }

  protected function deleteInvitation()
  {
    if (isset($_SESSION) && isset($_SESSION['user']['id']) && isset($this->params['id'])) {
      return $this->models->deleteInvitation($this->params['id']);
    }

    http_response_code(401);
    return array('error' => 'Unauthorized');
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'Invitation';

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

