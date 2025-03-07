<?php

use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('article', ArticleController::class);
Route::get('article/{id}/tags', [ArticleController::class, 'tags']);
Route::get("article/search/{SlugTag}", [ArticleController::class, 'search']);
Route::get("article/searchText/{text}", [ArticleController::class, 'searchText']);

Route::apiResource('tag', TagController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    Route::get('/logout',  [AuthController::class, 'logout']);

    Route::get('/user',  function (Request $request) {
                                return $request->user();
                         });

});



