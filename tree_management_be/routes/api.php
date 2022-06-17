<?php

use App\Http\Controllers\Api\Admin\TreeController;
use App\Http\Controllers\Api\Admin\PlanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix("admin")->group(function (){
    Route::prefix("tree")->group(function (){
        Route::get("list", [TreeController::class, 'index']);
        
        
        Route::post("create", [TreeController::class, 'create']);
        Route::put("update", [TreeController::class, 'update']);
        Route::get("search", [TreeController::class, 'search']);
        Route::delete("delete/{id}", [TreeController::class, 'delete']);
    });
    Route::prefix("plan")->group(function (){
        Route::get("list", [PlanController::class, 'index']);
        Route::post("create", [PlanController::class, 'create']);
        Route::put("update", [PlanController::class, 'update']);
        Route::get("search", [PlanController::class, 'search']);
        Route::delete("delete/{id}", [PlanController::class, 'delete']);
    });
});
