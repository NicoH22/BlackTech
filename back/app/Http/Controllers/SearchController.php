<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Products;


class SearchController extends Controller
{
    public function search(request $request){
        $search = Products::where('name','like' ,"%".$request->search."%")->orWhere('description', 'like',"%".$request->search."%")->get();
        return $search;
    }
}
