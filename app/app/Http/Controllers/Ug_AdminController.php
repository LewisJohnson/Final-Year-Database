<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class Ug_AdminController extends Controller
{
    public function index(){
        return view('admin.ug.index');
    }

    public function students(){
        return view('admin.ug.students');
    }

    public function importStudents(){
        return view('admin.ug.import');
    }

    public function supervisors(){
        return view('admin.ug.supervisors');
    }

    public function topics(){
        return view('admin.ug.topics');
    }

    public function loginAsView(){
        return view('admin.ug.login-as');
    }

    public function loginAs($id){
        $user = User::find($id);
        Auth::login($user);
        return redirect('/');
    }
}

