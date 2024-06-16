<?php

namespace App\Controllers;

use App\models\EventsModels;

class Events
{
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params)
  {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new EventsModels();

    $this->run();
  }

  protected function getEvents()
  {
    if (
      $_SESSION['user']
      && !empty($this->params['id'])
    ) {
      $events = $this->models->getEvents($this->params['id']);
    } else {
      $events = false;
    }

    http_response_code($events !== false ? 200 : 400);
    return $events;
  }

  protected function postEvents()
  {
    if ($_SESSION['user']) {
      $inputJSON = file_get_contents('php://input');
      $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
      $event = $this->models->postEvent($input, $this->params['id']);
    } else {
      $event = false;
    }

    http_response_code($event ? 200 : 400);
    return $event;
  }

  protected function deleteEvents()
  {
    if (
      $_SESSION['user']
      && !empty($this->params['id'])
    ) {
      $event = $this->models->deleteEvent($this->params['id']);
    } else {
      $event = false;
    }

    http_response_code($event ? 200 : 400);
    return $event;
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'Events';

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
