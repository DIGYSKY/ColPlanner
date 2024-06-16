<?php

require 'vendor/autoload.php';

// php config
  ini_set('session.gc_probability', 1);
  ini_set('session.gc_divisor', 100);
  ini_set('session.gc_maxlifetime', 604800);
//

use App\Router;
use App\Controllers\Login;
use App\Controllers\Register;
use App\Controllers\Coloc;
use App\Controllers\User;
use App\Controllers\ColocUser;
use App\Controllers\Invitation;
use App\Controllers\Expence;
use App\Controllers\Task;
use App\Controllers\Comunicate;
use App\Controllers\Events;

new Router([
  'login' => Login::class,
  'register' => Register::class,
  'coloc/:methode' => Coloc::class,
  'user/:mode/:by/:id' => User::class,
  'colocuser/:mode/:id' => ColocUser::class,
  'invitation/:id' => Invitation::class,
  'expence/:id' => Expence::class,
  'task/:id' => Task::class,
  'comunicate/:id' => Comunicate::class,
  'events/:id' => Events::class
]);
