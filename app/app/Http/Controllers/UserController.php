<?php

namespace App\Http\Controllers;

use App\User;
use App\Student;
use App\Supervisor;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::create([
            'username' => $request['username'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'access_type' => $request['access_type'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ]);

        if($user->access_type == "student"){
            Student::create([
                'id' => $user->id,
                'registration_number' => $request['registration_number'],
                'programme' => $request['programme']
            ]);
        } else if ($user->access_type == "supervisor"){
            Supervisor::create([
                'id' => $user->id,
                'title' => $request['title'],
                'contact_type' => $request['contact_type'],
                'project_load' => $request['project_load'],
                'take_students' => isset($request['take_students']),
            ]);
        }

        return redirect('user/'.$user->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return view('users.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
