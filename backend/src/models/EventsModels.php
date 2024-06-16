<?php

namespace App\models;

use App\models\DbConnect;

class EventsModels extends DbConnect
{
  public function getEvents($colocId)
  {
    if ($colocId === 'this') {
      $colocId = $_SESSION['user']['current_coloc'];
    } else {
      return false;
    }

    $sql = "SELECT events.*, events.id AS event_id FROM events WHERE coloc_id = :colocId";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':colocId', $colocId);
    $request->execute();
    return $request->fetchAll();
  }

  public function postEvent($input, $colocId)
  {
    if (
      $colocId === 'this'
      && !empty($input['title'])
      && !empty($input['description'])
      && !empty($input['start'])
      && !empty($input['end'])
      && !empty($input['color'])
    ) {
      $colocId = $_SESSION['user']['current_coloc'];
    } else {
      return false;
    }

    $sql = "INSERT INTO events (coloc_id, title, description, start, end, color) VALUES (:colocId, :title, :description, :start, :end, :color)";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':colocId', $colocId);
    $request->bindParam(':title', $input['title']);
    $request->bindParam(':description', $input['description']);
    $request->bindParam(':start', $input['start']);
    $request->bindParam(':end', $input['end']);
    $request->bindParam(':color', $input['color']);
    $request->execute();
    return $request->errorCode() == 0;
  }

  public function deleteEvent($id)
  {
    $sql = "DELETE FROM events WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':id', $id);
    $request->execute();
    return $request->errorCode() == 0;
  }
}
