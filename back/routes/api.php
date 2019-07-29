<?php

use Illuminate\Http\Request;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\FdpController;
use App\Http\Middleware\CheckAdmin;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: GET,PUT,DELETE,POST");
header("Access-Control-Allow-Headers: content-type,authorization,access-control-allow-origin,access-control-allow-headers ");


Route::post('login', 'AdminController@login');
Route::post('admin/add', 'AdminController@add');
Route::post('admin/{id}/edit', 'AdminController@edit');
Route::post('admin/{id}/delete', 'AdminController@delete');
Route::post('admin/addCategories', 'AdminController@addCategories');
Route::post('admin/deleteCategories', 'AdminController@deleteCategories');


Route::post('register','UserController@index');
Route::get('profil','UserController@show');
Route::post('edit/profil/{id}','UserController@edit');


Route::get('categories','CategoriesController@recup_cate')->name('categories');
Route::get('categories/{id}','CategoriesController@index');

Route::get('subcategories/','SousCategoriesController@index');
Route::get('subcategories/{id}','SousCategoriesController@index');

Route::get('fdp/','FdpController@index');


Route::get('pictures','PicturesController@getImg');
Route::get('pictures/distinct','PicturesController@getImgDistinct');
Route::get('pictures/{pictures}','PicturesController@getImgId');
Route::get('products','ProductsController@getAll');
Route::get('products/{products}','ProductsController@getById');
Route::get('search/{search}','SearchController@search');
Route::post('visit/count/{products}','ProductsController@countVisit');
Route::get('visit/best','ProductsController@bestVisit');

Route::middleware('checkadmin')->get('admin', function(Request $request) {
    return $request->user();
});

Route::post('checkout', 'PanierController@checkout');
Route::post('payment', 'StripePaymentController@stripePost');


