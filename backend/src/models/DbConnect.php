<?php

namespace App\models;

use \PDO;

class DbConnect {
  public object $bdd;
  private string $ip;
  private string $dataBase;
  private string $userBase;
  private string $passwordBase;
  
  public function __construct() {
    $this->ip = '127.0.0.1';
    $this->dataBase = 'ColPlanner';
    $this->userBase = 'root';
    $this->passwordBase = 'root';

    $this->bdd = new PDO('mysql:host='.$this->ip.';dbname='.$this->dataBase.';charset=utf8',''.$this->userBase.'',''.$this->passwordBase.'');
    $this->bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $this->bdd->setAttribute(PDO::ATTR_PERSISTENT, false);
  }
}
