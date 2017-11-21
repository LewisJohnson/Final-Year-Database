<?php
namespace App;

class StudentMasters extends Student{
	protected $table = 'students_masters';
	
	public function user(){
        return $this->hasOne(User::class, 'id');
    }
}
