<?php

namespace App\models;

use App\models\DbConnect;

class InvitationModels extends DbConnect
{
  public function postInvitation()
  {
    $inputJSON = file_get_contents('php://input');
    $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;

    if ($input) {
      $sql = "INSERT INTO `invitation` (`user_id`, `coloc_id`, `user_origine`) VALUES (:user_id, :coloc_id, :user_origine);";

      $request = $this->bdd->prepare($sql);
      $request->bindParam(':user_id', $input['userId']);
      $request->bindParam(':coloc_id', $_SESSION['user']['current_coloc']);
      $request->bindParam(':user_origine', $_SESSION['user']['id']);
      $request->execute();
      $errorCode = $request->errorCode();

      if ($errorCode == 0) {
        http_response_code(201);
        return array('success' => 'Invitation ajoutée avec succès');
      } else {
        http_response_code(500);
        return array('error' => 'Erreur serveur');
      }
    }

    http_response_code(400);
    return array('error' => 'Données d\'entrée invalides');
  }

  public function getInvitation()
  {
    $sql = "SELECT 
            u1.name AS invitee_name, 
            u2.name AS inviter_name, 
            i.id AS invitation_id, 
            c.name AS coloc_name, 
            c.id AS coloc_id
          FROM 
            `invitation` i 
          JOIN 
            `users` u1 
          ON 
            i.user_id = u1.id 
          JOIN 
            `users` u2 
          ON 
            i.user_origine = u2.id 
          JOIN 
            `coloc` c 
          ON 
            i.coloc_id = c.id 
          WHERE 
            i.user_id = :user_id;
    ";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':user_id', $_SESSION['user']['id']);
    $request->execute();
    $errorCode = $request->errorCode();
    if ($errorCode == 0) {
      return $request->fetchAll();
    } else {
      http_response_code(500);
      return array('error' => 'Erreur serveur');
    }

    http_response_code(400);
    return array('error' => 'Données d\'entrée invalides');
  }

  public function deleteInvitation($userId)
  {
    $sql = "DELETE FROM `invitation` WHERE `id` = :id;";

    $request = $this->bdd->prepare($sql);
    $request->bindParam(':id', $userId);
    $request->execute();
    $errorCode = $request->errorCode();
    if ($errorCode == 0) {
      return array('success' => 'Invitation supprimée avec succès');
    } else {
      http_response_code(500);
      return array('error' => 'Erreur serveur');
    }
  }
}
