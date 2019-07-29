<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Products;

class ProductsController extends Controller
{
    public function getAll(){
        $allProducts =Products::paginate(3);
//        $allProducts =Products::all();
        return $allProducts;
    }   

    public function getById(request $request){
       
        $product = Products::find($request->products);
        return $product;
    }

    public function countVisit(request $request){
        $count = Products::find($request->products);
        $count->count_visit++;        
        $count->save();
        return $count;
    }

    public function bestVisit(){
        $best = Products::orderBy('count_visit','desc')->limit(5)->get();
        return $best;
    }
}
