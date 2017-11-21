<?php
namespace App;

class StudentUg extends Student{

	protected $table = 'students_ug';

	public function user(){
        return $this->hasOne(User::class, 'id');
    }
    
}
