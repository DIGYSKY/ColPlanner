<?php

namespace App\models;

use App\models\DbConnect;

class ColocModels extends DbConnect
{
  public function getMethode(string $methode, $httpReq)
  {
    $methode = $httpReq . ucfirst($methode);
    if (method_exists($this, $methode)) {
      return $methode;
    }
  }

  public function getAll()
  {
    $sql = "SELECT 
              coloc.id AS coloc_id,
              coloc.name AS coloc_name,
              users.id AS user_id,
              users.name AS user_name,
              users.email AS user_email,
              coloc_user.is_admin AS is_admin
            FROM 
                coloc
            JOIN 
                coloc_user ON coloc.id = coloc_user.coloc_id
            JOIN 
                users ON coloc_user.user_id = users.id
            WHERE 
                coloc.id IN (
                    SELECT coloc_id
                    FROM coloc_user
                    WHERE user_id = :user_id
                );
    ";

    $request = $this->bdd->prepare($sql);
    $request->bindParam(':user_id', $_SESSION['user']['id']);
    $request->execute();
    $errorCode = $request->errorCode();

    if ($errorCode == 0 && $colocs = $request->fetchAll()) {
      return $colocs;
    } else {
      return false;
    }
  }

  public function patchName($input)
  {
    $sql = "UPDATE coloc SET name = :name WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':name', $input['name']);
    $request->bindParam(':id', $input['id']);
    $request->execute();
    $errorCode = $request->errorCode();
    if ($errorCode == 0) {
      return true;
    } else {
      return false;
    }
  }

  public function postNew($input)
  {
    if (isset($input) && !empty($input['name'])) {
      $sql = "INSERT INTO coloc (name) VALUES (:name)";
      $request = $this->bdd->prepare($sql);
      $request->bindParam(':name', $input['name']);
      $request->execute();
      $errorCode = $request->errorCode();
      if ($errorCode == 0) {
        $colocUserModel = new \App\models\ColocUserModels();
        $input = [
          'colocId' => $this->bdd->lastInsertId()
        ];
        $errorCodeUser = $colocUserModel->postAdd('this', $input) ? 0 : 1;
        if ($errorCodeUser == 0) {
          return true;
        }
      }
    }

    return false;
  }
}
