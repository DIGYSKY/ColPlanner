<?php

namespace App\Controllers;

use App\models\TaskModels;

class Task
{
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params)
  {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new TaskModels();

    $this->run();
  }

  protected function getTask()
  {
    if (
      $_SESSION['user']
      && !empty($this->params['id'])
    ) {
      $tasks = $this->models->getTasks($this->params['id']);
    } else {
      $tasks = false;
    }

    http_response_code($tasks ? 200 : 400);
    return $tasks;
  }

  protected function postTask()
  {
    if ($_SESSION['user']) {
      $inputJSON = file_get_contents('php://input');
      $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
      $task = $this->models->postTask($input, $this->params['id']);
    } else {
      $task = false;
    }

    http_response_code($task ? 200 : 400);
    return $task;
  }

  protected function deleteTask()
  {
    if (
      $_SESSION['user']
      && !empty($this->params['id'])
    ) {
      $task = $this->models->deleteTask($this->params['id']);
    } else {
      $task = false;
    }

    http_response_code($task ? 200 : 400);
    return $task;
  }

  protected function patchTask()
  {
    if (
      isset($_SESSION)
      && !empty($_SESSION['user'])
      && !empty($this->params['id'])
    ) {
      $inputJSON = file_get_contents('php://input');
      $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
      $task = $this->models->patchTask($input, $this->params['id']);
    } else {
      $task = false;
    }

    http_response_code($task ? 200 : 400);
    return $task;
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'Task';

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
