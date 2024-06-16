<?php

namespace App\Controllers;

use App\models\ColocModels;

class Coloc
{
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params)
  {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new ColocModels();

    $this->run();
  }

  protected function postColoc()
  {
    if (
      isset($_SESSION)
      && !empty($_SESSION['user'])
      && !empty($this->params['methode'])
      && $methode = $this->models->getMethode($this->params['methode'], $this->reqMethod)
    ) {
      $inputJSON = file_get_contents('php://input');
      $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
      return $this->$methode($this->models->$methode($input));
    }
  }

  protected function getColoc()
  {
    if (
      isset($_SESSION)
      && !empty($_SESSION['user'])
      && !empty($this->params['methode'])
      && $methode = $this->models->getMethode($this->params['methode'], $this->reqMethod)
    ) {
      return $this->$methode($this->models->$methode());
    }

    http_response_code(403);
    return array('error' => 'not conneced');
  }

  protected function patchColoc()
  {
    if (
      isset($_SESSION)
      && !empty($_SESSION['user'])
      && !empty($this->params['methode'])
      && $methode = $this->models->getMethode($this->params['methode'], $this->reqMethod)
    ) {
      $inputJSON = file_get_contents('php://input');
      $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
      return $this->$methode($this->models->$methode($input));
    }

    http_response_code(403);
    return array('error' => 'not conneced');
  }

  protected function getAll($colocs)
  {
    if ($colocs) {
      $data = [];

      foreach ($colocs as $row) {
        $coloc_id = $row['coloc_id'];
        if (!isset($data[$coloc_id])) {
          $data[$coloc_id] = [
            'coloc_id' => $row['coloc_id'],
            'coloc_name' => $row['coloc_name'],
            'users' => []
          ];
        }
        $data[$coloc_id]['users'][] = [
          'user_id' => $row['user_id'],
          'user_name' => $row['user_name'],
          'user_email' => $row['user_email'],
          'is_admin' => $row['is_admin']
        ];
      }
      http_response_code(200);
      return $data;
    } else {
      http_response_code(500);
      return array('error' => 'error serveur');
    }
  }

  protected function patchName($return)
  {
    http_response_code($return ? 200 : 403);
    return array('success' => $return);
  }

  protected function postNew($return)
  {
    http_response_code($return ? 200 : 403);
    return array('success' => $return);
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'Coloc';

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
