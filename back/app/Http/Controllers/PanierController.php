<?php

namespace App\Http\Controllers;

use App\Products;
use Illuminate\Http\Request;

class PanierController extends Controller
{
    public function checkout(Request $request)
    {
        foreach ($request->all() as $tab)
        {

            $id = $tab['id'];
            $quantity = $tab['quantity'];
            $products = new Products();
            $productsNew = $products::find($id);

            if($productsNew->quantity >= $quantity)
            {
                $productsNew->decrement('quantity', $quantity);

                if ($productsNew->save() === TRUE) {continue;}
                else
                {
                    return response()->json([
                        'success' => 'Products sell error',
                        'code' => 401,
                    ], 401);
                }
            }
            else
            {
                return response()->json([
                    'success' => 'No more stock',
                    'code' => 401,
                ], 401);
            }
        }
        return response()->json([
            'success' => 'Products sell',
            'code' => 200,
        ], 200);

    }
}
