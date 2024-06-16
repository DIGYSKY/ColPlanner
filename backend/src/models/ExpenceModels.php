<?php

namespace App\models;

use App\models\DbConnect;

class ExpenceModels extends DbConnect
{
  public function getExpences()
  {
    $sql = "SELECT 
              expence.id, 
              expence.name, 
              expence.price, 
              expence.description, 
              expence.count,
              users.name AS user_name,
              users.id AS user_id
            FROM expence 
            JOIN users ON expence.user_id = users.id
            WHERE expence.coloc_id = :coloc_id
            ORDER BY expence.created_at DESC";

    $request = $this->bdd->prepare($sql);
    $request->bindParam(':coloc_id', $_SESSION['user']['current_coloc']);
    $request->execute();
    $errorCode = $request->errorCode();

    if ($errorCode == 0) {
      return $request->fetchAll();
    }

    return false;
  }

  public function getOwes($solds)
  {
    $owes = [];

    foreach ($solds as $userId => $userSold) {
      if ($userSold['sold'] < 0) {
        foreach ($solds as $otherUserId => $otherUserSold) {
          if ($otherUserSold['sold'] > 0) {
            $amount = min(abs($userSold['sold']), $otherUserSold['sold']);
            if ($amount > 0) {
              $owes[] = [
                'from' => $userId,
                'to' => $otherUserId,
                'amount' => $amount,
                'name_from' => $userSold['name'],
                'name_to' => $otherUserSold['name']
              ];
              $solds[$userId]['sold'] += $amount;
              $solds[$otherUserId]['sold'] -= $amount;
            }
          }
        }
      }
    }

    return $owes;
  }

  public function getSolds($expences)
  {
    $solds = [];
    $colocUsers = $this->getColocUsers();
    $numUsers = count($colocUsers);

    foreach ($colocUsers as $user) {
      $solds[$user['user_id']] = [
        'name' => $user['user_name'],
        'id_user' => $user['user_id'],
        'sold' => 0
      ];
    }

    $expencesPayed = $this->getExpencesPay($expences, $colocUsers);

    $expencesPay = $expencesPayed['expencesPay'];
    $userPay = $expencesPayed['userPay'];

    foreach ($expences as $expence) {
      if (in_array($expence, $expencesPay)) {
        continue;
      }

      $userId = $expence['user_id'];
      $amountPerUser = $expence['price'] / $numUsers;

      foreach ($colocUsers as $user) {
        if (
          isset($userPay[$expence['id']])
          && in_array($user['user_id'], $userPay[$expence['id']])
          && $user['user_id'] != $userId
        ) {
          continue;
        }

        $numPaid = isset($userPay[$expence['id']]) ? count($userPay[$expence['id']]) : 0;

        if ($user['user_id'] == $userId) {
          $solds[$userId]['sold'] += (($expence['price'] - $amountPerUser) - ($amountPerUser * $numPaid));
        } else {
          $solds[$user['user_id']]['sold'] -= $amountPerUser;
        }
      }
    }

    foreach ($solds as &$sold) {
      $sold['sold'] = round($sold['sold'], 2);
    }
    unset($sold); 

    return $solds;
  }

  public function getExpencesPay($expences, $colocUsers)
  {
    if (empty($expences)) {
      return [
        'expencesPay' => [],
        'userPay' => []
      ];
    }

    $expenceIds = array_column($expences, 'id');
    $placeholders = implode(',', array_fill(0, count($expenceIds), '?'));
    $sql = "SELECT expence_id, user_id FROM expences_pay WHERE expence_id IN ($placeholders)";
    $request = $this->bdd->prepare($sql);
    $request->execute($expenceIds);
    $result = $request->fetchAll();

    $expencesPay = [];
    $userPay = [];
    $paidExpenceIds = array_column($result, 'expence_id');
    $paidUserIds = array_column($result, 'user_id');

    foreach ($expences as $expence) {
      $expenceIdCount = array_count_values($paidExpenceIds)[$expence['id']] ?? 0;
      if ($expenceIdCount == $expence['count']) {
        $expencesPay[] = $expence;
        $userPay[] = $expence['user_id'];
      }

      foreach ($colocUsers as $user) {
        if (in_array($user['user_id'], $paidUserIds)) {
          $userPay[$expence['id']][] = $user['user_id'];
        }
      }
    }

    return [
      'expencesPay' => $expencesPay,
      'userPay' => $userPay
    ];
  }

  public function getColocUsers()
  {
    $sql = "SELECT users.id as user_id, users.name as user_name 
            FROM coloc_user 
            JOIN users ON coloc_user.user_id = users.id 
            WHERE coloc_user.coloc_id = :coloc_id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':coloc_id', $_SESSION['user']['current_coloc']);
    $request->execute();
    return $request->fetchAll();
  }

  public function postExpence($input)
  {
    $count = count($this->getColocUsers()) - 1;

    $sql = "INSERT INTO expence (user_id, coloc_id, price, name, description, count) 
            VALUES (:user_id, :coloc_id, :price, :name, :description, :count)";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':user_id', $_SESSION['user']['id']);
    $request->bindParam(':coloc_id', $_SESSION['user']['current_coloc']);
    $request->bindParam(':price', $input['price']);
    $request->bindParam(':name', $input['expence']);
    $request->bindParam(':description', $input['description']);
    $request->bindParam(':count', $count);
    $request->execute();
    return $request->errorCode() == 0;
  }

  public function deleteExpence($id)
  {
    $sql = "DELETE FROM expence WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':id', $id);
    $request->execute();
    $errorCode = $request->errorCode();

    return $errorCode == 0;
  }

  public function payExpence($id)
  {
    $checkSql = "SELECT COUNT(*) FROM expences_pay WHERE expence_id = :expence_id AND user_id = :user_id";
    $checkRequest = $this->bdd->prepare($checkSql);
    $checkRequest->bindParam(':expence_id', $id);
    $checkRequest->bindParam(':user_id', $_SESSION['user']['id']);
    $checkRequest->execute();
    $alreadyPaid = $checkRequest->fetchColumn();

    if ($alreadyPaid > 0) {
      return false;
    }

    $sql = "INSERT INTO expences_pay (expence_id, user_id) 
            VALUES (:expence_id, :user_id)";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':expence_id', $id);
    $request->bindParam(':user_id', $_SESSION['user']['id']);
    $request->execute();
    $errorCode = $request->errorCode();

    return $errorCode == 0;
  }
}
