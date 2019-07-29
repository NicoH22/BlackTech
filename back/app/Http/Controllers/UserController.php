<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class UserController extends Controller
{
    public function index(Request $request){
        $user=new User();

        $user->name = $request->input('name');
        $user->first_name = $request->input('first_name');
        $user->date_birth = $request->input('date_birth');
        $user->phone_number = $request->input('phone_number');
        $user->email = $request->input('email');
        $user->password = hash('sha256',$request->input('password'));
        $user->save();
        return response()->json([
            'success' => 'Record inserted',
            'code' => 200,
        ], 200);

    }


    public function show(Request $request){

        $authorization = $request->header('authorization');
        $token = explode(' ', $authorization);
        $user = User::where('api_token','=', $token[1])->get()->first();


        return $user;

    }

public function edit(Request $request){
    $uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri_segments = explode('/', $uri_path);

    $user= User::find($uri_segments[4]);
       $user->name=$request->input('name');
       $user->first_name=$request->input('first_name');
       $user->date_birth=$request->input('date_birth');
       $user->phone_number=$request->input('phone_number');
       $user->email=$request->input('email');


$user->save();



}


}
