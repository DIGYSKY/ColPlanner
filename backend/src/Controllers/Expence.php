<?php

namespace App\Controllers;

use App\models\ExpenceModels;

class Expence 
{
  protected array $params;
  protected string $reqMethod;
  protected object $models;

  public function __construct($params)
  {
    $this->params = $params;
    $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);
    $this->models = new ExpenceModels();

    $this->run();
  }

  protected function getExpence()
  {
    $expences = $this->models->getExpences();
    $solds = $this->models->getSolds($expences);
    $owes = $this->models->getOwes($solds);
    $expencesPay = $this->models->getExpencesPay($expences, $this->models->getColocUsers());

    http_response_code(200);
    return array('success' => [
      'expences' => $expences,
      'owes' => $owes,
      'solds' => $solds,
      'expencesPay' => $expencesPay
    ]);
  }

  protected function postExpence()
  {
    $inputJSON = file_get_contents('php://input');
    $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;

    $expence = $this->models->postExpence($input);

    http_response_code($expence ? 200 : 500);
    return array_merge(['success' => $expence]);
  }

  protected function deleteExpence()
  {
    if (!isset($this->params['id'])) {
      http_response_code(400);
      return array_merge(['success' => false, 'message' => 'ID is required']);
    }

    $expence = $this->models->deleteExpence($this->params['id']);

    http_response_code($expence ? 200 : 500);
    return array_merge(['success' => $expence]);
  }

  protected function patchExpence()
  {
    $inputJSON = file_get_contents('php://input');
    $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;

    if (!isset($this->params['id']) || (
      !isset($input['paid'])
      || $input['paid'] == false
    )) {
      http_response_code(400);
      return array(
        'success' => false,
        'message' => 'ID is required'
      );
    }

    $expence = $this->models->payExpence($this->params['id']);

    http_response_code($expence ? 200 : 500);
    return array(
      'success' => $expence
    );
  }

  protected function ifMethodExist()
  {
    $method = $this->reqMethod . 'Expence';

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
