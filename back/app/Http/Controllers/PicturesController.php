<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Pictures;

class PicturesController extends Controller
{
    public function getImg(){
        return Pictures::all();
    }
    public function getImgDistinct(){

        $test = DB::table('pictures')
                ->select(DB::raw('count(*) as cnt, name,products_id'))
                ->groupBy('products_id')
                ->get();
       
    
        return $test;
        
    }
    
    public function getImgId(request $request){
        $pictures = Pictures::where('products_id','=', $request->pictures)->get();
        return $pictures;
    }
}
