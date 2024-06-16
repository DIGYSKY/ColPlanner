<?php

namespace App\models;

use App\models\DbConnect;

class ComunicateModels extends DbConnect
{
  public function getComunicates($colocId)
  {
    if ($colocId === 'this') {
      $colocId = $_SESSION['user']['current_coloc'];
    } else {
      return false;
    }

    $sql = "SELECT * FROM comunicate WHERE coloc_id = :colocId ORDER BY created_at DESC";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':colocId', $colocId);
    $request->execute();
    return $request->fetchAll();
  }

  public function postComunicate($input, $colocId)
  {
    if (
      $colocId === 'this'
      && !empty($input['title'])
      && !empty($input['content'])
    ) {
      $colocId = $_SESSION['user']['current_coloc'];
    } else {
      return false;
    }

    $sql = "INSERT INTO comunicate (coloc_id, title, content) VALUES (:colocId, :title, :content)";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':colocId', $colocId);
    $request->bindParam(':title', $input['title']);
    $request->bindParam(':content', $input['content']);
    $request->execute();
    return $request->errorCode() == 0;
  }

  public function deleteComunicate($id)
  {
    $sql = "DELETE FROM comunicate WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':id', $id);
    $request->execute();
    return $request->errorCode() == 0;
  }
}
