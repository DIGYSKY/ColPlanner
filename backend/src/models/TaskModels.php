<?php

namespace App\models;

use App\models\DbConnect;

class TaskModels extends DbConnect
{
  public function getTasks($colocId)
  {
    if ($colocId === 'this') {
      $colocId = $_SESSION['user']['current_coloc'];
    } else {
      return false;
    }
    $sql = "SELECT tasks.*, users.name AS user_name 
          FROM tasks 
          JOIN users ON tasks.user_id = users.id 
          WHERE tasks.coloc_id = :colocId
          ORDER BY tasks.at_before DESC, tasks.created_at DESC";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':colocId', $colocId);
    $request->execute();
    return $request->fetchAll();
  }

  public function postTask($input, $id)
  {
    if (!isset($_SESSION['user']) && $id !== 'new') {
      return false;
    }

    $userId = $_SESSION['user']['id'];
    $colocId = $_SESSION['user']['current_coloc'];
    $title = $input['title'] ?? null;
    $content = $input['content'] ?? null;
    $atBefore = $input['date'] ?? null;
    $asignedTo = $input['forId'] ?? null;

    if (!$title || !$content) {
      return false;
    }

    $sql = "INSERT INTO tasks (
              user_id, 
              coloc_id, 
              title, 
              content, 
              at_before,
              asigned_to
            ) 
            VALUES (
              :user_id, 
              :coloc_id, 
              :title, 
              :content, 
              :at_before,
              :asigned_to
            )";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':user_id', $userId);
    $request->bindParam(':coloc_id', $colocId);
    $request->bindParam(':title', $title);
    $request->bindParam(':content', $content);
    $request->bindParam(':at_before', $atBefore);
    $request->bindParam(':asigned_to', $asignedTo);
    $request->execute();

    if ($request->errorCode() == 0) {
      return true;
    } else {
      return false;
    }
  }

  public function deleteTask($id)
  {
    $sql = "DELETE FROM tasks WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':id', $id);
    $request->execute();
    return $request->errorCode() == 0;
  }

  public function patchTask($input, $id)
  {
    if (
      !isset($input['make'])
      || !isset($input['make'])
      || !isset($id)
    ) {
      return false;
    }

    $sql = "UPDATE tasks SET make = :make WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':make', $input['make']);
    $request->bindParam(':id', $id);
    $request->execute();
    return $request->errorCode() == 0;
  }
}
