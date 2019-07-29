<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $authorization = $request->header('authorization');
        $token = explode(' ', $authorization);
        $admin = User::where('api_token', $token[1])->get()->first();

        if($admin && $admin->admin == 1){
            return response()->json([
                'error' => 'Admin user',
                'code' => 200,
            ], 200);
        }
        else{
            return response()->json([
                'error' => 'Public user',
                'code' => 401,
            ], 401);
        }
       
    }
}
