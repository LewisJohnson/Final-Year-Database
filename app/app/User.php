<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
	use Notifiable;
    public $timestamps = false;
    protected $dates = [
        'last_login'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'first_name', 'last_name', 'email', 'password', 'access_type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function isAdmin(){
        return $this->access_type === "admin";
    }

    public function isSupervisor(){
        return $this->access_type === "supervisor";
    }

    public function isStudent(){
        return $this->access_type === "student";
    }

    public function student(){
        return $this->hasOne(Student::class, 'id');
    }

    public function supervisor(){
        return $this->hasOne(Supervisor::class, 'id');
    }

    public function projects(){
        if($this->isAdmin() || $this->isSupervisor()){
           return $this->hasMany(Project::class, 'supervisor_id');
        } else {
            return null;
        }
    }

    public function getFullName(){
        if($this->isAdmin() || $this->isSupervisor()){
            $format = '%s %s %s';
            return sprintf($format, $this->supervisor->title, $this->first_name, $this->last_name);
        } else {
            $format = '%s %s';
            return sprintf($format, $this->first_name, $this->last_name);
        }
    }
}