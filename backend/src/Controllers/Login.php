<?php

namespace App\Controllers;

use App\models\UsersModels;

class Login 
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

  protected function getLogin()
  {
    if (
      isset($_SESSION)
      && !empty($_SESSION['user'])
    ) {
      http_response_code(200);
      return array('success' => $_SESSION['user']);
    }
    http_response_code(403);
    return array('success' => false);
  }

  protected function deleteLogin() {
    unset($_SESSION['user']);
    session_unset();
    session_destroy();

    http_response_code(200);
    return array('success' => 'Logout');
  }

  protected function postLogin()
  {
    $inputJSON = file_get_contents('php://input');
    $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
    $user = $this->models->postLogin($input);
    if (
      $user
      && password_verify($input['password'], $user['password'])
      && !isset($user['error'])
    ) {
      $this->newSession();
      $_SESSION['user'] = $user;
      http_response_code(200);
      return array(
        'apikey' => $_SESSION['apikey'],
        'user' => json_encode([
          'id' => $_SESSION['user']['id'],
          'name' => $_SESSION['user']['name'],
          'email' => $_SESSION['user']['email'],
          'current_coloc' => $_SESSION['user']['current_coloc']
        ])
      );
    }
    http_response_code(200);
    return array('error' => 'error : Password or email incorecct');
  }

  protected function newSession()
  {
    session_start([
      'use_cookies' => 0
    ]);
    $session_id = session_id();
    $_SESSION['apikey'] = $session_id;
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'Login';

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
