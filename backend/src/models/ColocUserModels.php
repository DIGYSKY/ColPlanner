<?php

namespace App\models;

use App\models\DbConnect;

class ColocUserModels extends DbConnect
{

  public function __construct()
  {
    parent::__construct();
  }

  public function getMethode(string $methode, $httpReq)
  {
    $methode = $httpReq . ucfirst($methode);
    if (method_exists($this, $methode)) {
      return $methode;
    }
  }

  public function deleteUser($userId)
  {
    $sqlUser = "DELETE FROM coloc_user WHERE user_id = :user_id AND coloc_id = :coloc_id";
    $requestUser = $this->bdd->prepare($sqlUser);
    $requestUser->bindParam(':user_id', $userId);
    $requestUser->bindParam(':coloc_id', $_SESSION['user']['current_coloc']);
    $requestUser->execute();
    return $requestUser->errorCode() == 0;
  }

  public function postAdd($userId, $input = [])
  {
    if (empty($input)) {
      $inputJSON = file_get_contents('php://input');
      $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
    }

    if ($userId === 'this') {
      $userId = $_SESSION['user']['id'];
    } else {
      return false;
    }

    if ($this->checkUser($input, $userId)) {
      return false;
    }

    return $this->addOrUpdateUser($input, $userId);
  }

  protected function checkUser($input, $userId)
  {
    $checkSql = "SELECT COUNT(*) FROM coloc_user WHERE user_id = :user_id AND coloc_id = :coloc_id";
    $checkRequest = $this->bdd->prepare($checkSql);
    $checkRequest->bindParam(':user_id', $userId);
    $checkRequest->bindParam(':coloc_id', $input['colocId']);
    $checkRequest->execute();
    return $checkRequest->fetchColumn() > 0;
  }

  protected function addOrUpdateUser($input, $userId)
  {
    $sql = "INSERT INTO coloc_user (user_id, coloc_id) VALUES (:user_id, :coloc_id)
            ON DUPLICATE KEY UPDATE coloc_id = :coloc_id;
            UPDATE users SET current_coloc = :coloc_id WHERE id = :user_id;
            INSERT INTO solde (user_id, coloc_id) VALUES (:user_id, :coloc_id)
            ON DUPLICATE KEY UPDATE coloc_id = :coloc_id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':user_id', $userId);
    $request->bindParam(':coloc_id', $input['colocId']);
    $request->execute();
    return $request->errorCode() == 0;
  }
}
