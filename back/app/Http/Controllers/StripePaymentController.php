<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe;

class StripePaymentController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */

    public function stripePost(Request $request)
    {
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        Stripe\Charge::create ([
            "amount" => $request->input('amount'),
            "currency" => "EUR",
            "source" => $request->token['id'],
            "description" => "Payment from Black-Tech"
        ]);

        return response()->json([
            'success' => 'Payment Success',
            'code' => 200,
        ], 200);

    }

}