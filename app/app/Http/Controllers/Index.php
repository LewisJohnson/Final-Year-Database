<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Index extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('index');
    }

    public function help()
    {
        return view('help.help');
    }

    public function information()
    {
        return view('help.information');
    }

    public function about()
    {
        return view('help.about');
    }
}
