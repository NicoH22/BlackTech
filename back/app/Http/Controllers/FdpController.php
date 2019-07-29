<?php

namespace App\Http\Controllers;

use App\Fdp;
use Illuminate\Http\Request;

class FdpController extends Controller
{
    public function index()
    {
        $fdp = Fdp::all();
        return response()->json(['fdp'=> $fdp]);
    }
}
