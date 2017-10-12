<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends App\User
{
    protected $primaryKey = 'student_id';
}
