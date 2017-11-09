<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class AdminController extends Controller
{
    public function index(){
        return view('admin.index');
    }

    public function students(){
        return view('admin.students');
    }

    public function importStudents(){
        return view('admin.import');
    }

    public function supervisors(){
        return view('admin.supervisors');
    }

    public function topics(){
        return view('admin.topics');
    }

    public function loginAsView(){
        return view('admin.login-as');
    }

    public function loginAs($id){
        $user = User::find($id);
        Auth::login($user);
        return redirect('/');
    }
}

