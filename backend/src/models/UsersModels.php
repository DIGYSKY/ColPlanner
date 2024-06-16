<?php

namespace App\models;

use App\models\DbConnect;

class UsersModels extends DbConnect
{
  public function postRegister()
  {
    $inputJSON = file_get_contents('php://input');
    $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;

    if ($datas = $this->validateInput($input)) {
      $sql = "INSERT INTO `users` (`name`, `email`, `password`) VALUES (:name, :email, :password);";

      $request = $this->bdd->prepare($sql);
      $request->bindParam(':name', $datas[0]);
      $request->bindParam(':email', $datas[1]);
      $request->bindParam(':password', $datas[2]);
      $request->execute();
      $errorCode = $request->errorCode();

      if ($errorCode == 0) {
        http_response_code(201);
        return array('success' => 'success');
      } else {
        http_response_code(500);
        return array('error' => 'error serveur');
      }
    }

    http_response_code(200);
    return array('status' => 'error : Password or email incorecct');
  }

  public function postLogin($input)
  {
    $sql = "SELECT * FROM users WHERE email = :email";

    $request = $this->bdd->prepare($sql);
    $request->bindValue(':email', $input['email']);
    $request->execute();
    $errorCode = $request->errorCode();

    if ($errorCode == 0) {
      return $request->fetch();
    } else {
      http_response_code(500);
      return array('error' => 'error serveur');
    }
  }

  protected function validatePassword(
    string $password,
    string $confPassword
  ) {
    if (
      (($password === $confPassword) || $confPassword)
      && preg_match('/[0-9]/', $password)
      && preg_match('/[^a-zA-Z0-9]/', $password)
      && preg_match('/[A-Z]/', $password)
      && preg_match('/[a-z]/', $password)
      && strlen($password) >= 8
    ) {
      return true;
    }
    return false;
  }

  protected function validateEmail($email)
  {
    $sql = "SELECT COUNT(*) AS email_count FROM users WHERE email = :email;";

    $request = $this->bdd->prepare($sql);
    $request->bindParam(':email', $email);
    $request->execute();
    $errorCode = $request->errorCode();

    if ($errorCode == 0) {
      $res = $request->fetch();
      if ($res['email_count'] < 1 && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return true;
      }
    }

    return false;
  }

  public function validateInput($input)
  {
    $name = !empty($input['name']) ? $input['name'] : false;
    $email = !empty($input['email']) && $this->validateEmail($input['email']) ? $input['email'] : false;
    $passwordConfirm = (
      isset($input['passwordConfirm']))
      ? $input['passwordConfirm'] : false;
    $password = (
      !empty($input['password']) && $this->validatePassword($input['password'], $passwordConfirm)
    ) ? password_hash($input['password'], PASSWORD_DEFAULT) : false;

    if ($name && $email && $password) {
      return [
        $name,
        $email,
        $password
      ];
    }

    return false;
  }

  public function getMethode(string $methode, string $by, $httpReq)
  {
    $methode = $httpReq . ucfirst($methode) . ucfirst($by);
    if (method_exists($this, $methode)) {
      return $methode;
    }
  }

  public function getSearchName($name)
  {
    if ($name) {
      $sql = "SELECT * FROM users WHERE name LIKE :name LIMIT 5";
      $request = $this->bdd->prepare($sql);
      $name = '%' . $name . '%';
      $request->bindParam(':name', $name);
      $request->execute();
      $errorCode = $request->errorCode();
      if ($errorCode == 0) {
        $users = $request->fetchAll();
        return $users;
      }
    }
    return false;
  }

  public function getColocCurrent($who)
  {
    if ($who === 'this') {
      $who = $_SESSION['user']['id'];
    }
    $sql = "SELECT current_coloc FROM users WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':id', $who);
    $request->execute();
    $errorCode = $request->errorCode();
    if ($errorCode == 0) {
      return $request->fetch();
    }
  }

  public function patchColocCurrent($id)
  {
    if ($id) {
      $sql = "UPDATE users SET current_coloc = :current_coloc WHERE id = :id";
      $request = $this->bdd->prepare($sql);
      $request->bindParam(':current_coloc', $id);
      $request->bindParam(':id', $_SESSION['user']['id']);
      $request->execute();
      $errorCode = $request->errorCode();
      if ($errorCode == 0) {
        return true;
      }
    }
    return false;
  }

  public function patchEditName($id)
  {
    $inputJSON = file_get_contents('php://input');
    $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
    $name = $input['name'];
    $sql = "UPDATE users SET name = :name WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':name', $name);
    $request->bindParam(':id', $id);
    $request->execute();
    $errorCode = $request->errorCode();

    if ($errorCode == 0) {
      $sql = "SELECT * FROM users WHERE id = :id";
      $request = $this->bdd->prepare($sql);
      $request->bindParam(':id', $id);
      $request->execute();
      $errorCode = $request->errorCode();

      if ($errorCode == 0) {
        $_SESSION['user'] = $request->fetch();
        return $_SESSION['user'];
      }
    }
    return false;
  }

  public function patchEditEmail($id)
  {
    $inputJSON = file_get_contents('php://input');
    $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
    $email = $input['email'];
    if ($this->validateEmail($email)) {
      $sql = "UPDATE users SET email = :email WHERE id = :id";
      $request = $this->bdd->prepare($sql);
      $request->bindParam(':email', $email);
      $request->bindParam(':id', $id);
      $request->execute();
      $errorCode = $request->errorCode();
      if ($errorCode == 0) {
        $sql = "SELECT * FROM users WHERE id = :id";
        $request = $this->bdd->prepare($sql);
        $request->bindParam(':id', $id);
        $request->execute();
        $errorCode = $request->errorCode();
        if ($errorCode == 0) {
          $_SESSION['user'] = $request->fetch();
          return $_SESSION['user'];
        }
      }
    }
    return false;
  }

  public function patchEditPassword($id)
  {
    $inputJSON = file_get_contents('php://input');
    $input = !empty($inputJSON) ? json_decode($inputJSON, TRUE) : false;
    $password = $input['password'];
    $confPassword = $input['confPassword'];
    if ($this->validatePassword($password, $confPassword)) {
      $password = password_hash($password, PASSWORD_DEFAULT);
    } else {
      return false;
    }
    $sql = "UPDATE users SET password = :password WHERE id = :id";
    $request = $this->bdd->prepare($sql);
    $request->bindParam(':password', $password);
    $request->bindParam(':id', $id);
    $request->execute();
    $errorCode = $request->errorCode();
    if ($errorCode == 0) {
      return true;
    }
    return false;
  }
}
