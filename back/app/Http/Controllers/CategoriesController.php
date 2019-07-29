<?php

namespace App\Http\Controllers;
use App\Categories;
use App\Products;
use App\Entity\Categorie;


use App\Souscategories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function recup_cate() {

        $categories = Categories::all();
        return response()->json(['categories'=> $categories]);

    }

    public function index(request $request) {
        $test = Products::where('categories_id','=',$request->id)->get();
        return $test;
    }

    public function showsouscat(){
        $souscategories = Souscategories::all();
        return response()->json(['sous_categories'=>$souscategories]);
    }
}
