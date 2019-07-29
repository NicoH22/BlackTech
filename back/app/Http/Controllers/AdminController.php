<?php

namespace App\Http\Controllers;

use App\Categories;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\User;
use App\Products;
use App\Pictures;

class AdminController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function login(Request $request)
    {
        $user = User::where('email','=', $request->input('email'))
            ->where('password','=',hash('sha256',$request->input('password')))
            ->get()->first();

        if (!$user) {
            return response()->json([
                'error' => 'Unauthenticated user',
                'code' => 401,
            ], 401);
        }
        else
        {
            
            $token = Str::random(60);
            $token = hash('sha256',$token);
            $user->api_token = $token;
            $user->save();

            return response()->json([
                'error' => 'authenticated user',
                'code' => 200,
                'api_token' => $token,
            ], 200);
        }

        
    }

    public function add(Request $request)
    {
       $products = new Products();

       $products->categories_id = $request->input('categories_id');
       $products->name = $request->input('name');
       $products->description = $request->input('description');
       $products->characteristic = $request->input('characteristic');
       $products->price = $request->input('price');
       $products->quantity = $request->input('quantity');


       if ($products->save() == TRUE)
       {
           if($request->hasfile('files')) {

               $images = $request->file('files');
               foreach ($images as $value) {

                   $pictures = new Pictures();
                   $extension = $value->getClientOriginalExtension();
                   Storage::disk('public')->put($value->getFilename() . '.' . $extension, File::get($value));
                   $newsItem = $products::find($products->id);
                   $pictures->name = $value->getFilename() . '.' . $extension;
                   $pictures->products_id = $newsItem->id;
                   $pictures->save();
               }
           }

           return response()->json([
               'success' => 'Record inserted',
               'code' => 200,
           ], 200);
       }

       else
       {
           return response()->json([
               'error' => 'error is over',
               'code' => 401,
           ], 401);
       }

    }

    public function edit (Request $request)
    {
        $products = Products::find($request->id);

        $products->categories_id = $request->input('categories_id');
        $products->name = $request->input('name');
        $products->description = $request->input('description');
        $products->characteristic = $request->input('characteristic');
        $products->price = $request->input('price');
        $products->quantity = $request->input('quantity');

        if ($products->save() == TRUE)
        {
            if($request->hasfile('files')) {

                if ($remove = Pictures::where('products_id', $request->id))
                {
                    $remove->delete();
                }

                $images = $request->file('files');
                foreach ($images as  $value) {

                    $pictures = new Pictures();
                    $extension = $value->getClientOriginalExtension();
                    Storage::disk('public')->put($value->getFilename() . '.' . $extension, File::get($value));
                    $newsItem = Pictures::find($request->id);
                    $pictures->name = $value->getFilename() . '.' . $extension;
                    $pictures->products_id = $newsItem->id;
                    $pictures->save();
                }
            }

            return response()->json([
                'success' => 'Record updated',
                'code' => 200,
            ], 200);
        }

        else
        {
            return response()->json([
                'error' => 'error is over',
                'code' => 401,
            ], 401);
        }

    }

    public function delete(Request $request)
    {
        Pictures::where('products_id', $request->id)->delete();
        Products::where('id', $request->id)->delete();

        return response()->json([
            'success' => 'Record deleted',
            'code' => 200,
        ], 200);
    }

    public function addCategories(Request $request) {

        $categorie = New Categories();


        $categorie->name = $request->input('name');
        if ($categorie->save() == TRUE) {

            return response()->json([
                'success' => 'Record inserted',
                'code' => 200,
            ], 200);
        }
        else {

            return response()->json([
                'error' => 'error is over',
                'code' => 401,
            ], 401);
        }
    }

    public function deleteCategories(Request $request) {

        Categories::where('id', $request->id)->delete();
        Categories::where('name', $request->name)->delete();


        return response()->json([
            'success' => 'Record deleted',
            'code' => 200,
        ], 200);
    }
}
