<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class Masters_AdminController extends Controller
{
    public function index(){
        return view('admin.masters.index');
    }

    public function students(){
        return view('admin.masters.students');
    }

    public function importStudents(){
        return view('admin.masters.import');
    }

    public function supervisors(){
        return view('admin.masters.supervisors');
    }

    public function topics(){
        return view('admin.masters.topics');
    }

    public function loginAsView(){
        return view('admin.masters.login-as');
    }

    public function loginAs($id){
        $user = User::find($id);
        Auth::login($user);
        return redirect('/');
    }
}

