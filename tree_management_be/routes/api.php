<?php

use App\Http\Controllers\Api\Admin\StaffController;
use App\Http\Controllers\Api\Admin\StatisticController;
use App\Http\Controllers\Api\Admin\TreeController;
use App\Http\Controllers\Api\Admin\PlanController;
use App\Http\Controllers\Api\Admin\TreeCategoryController;
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
    Route::prefix("tree-category")->group(function (){
        Route::get("list", [TreeCategoryController::class, 'index']);
    });

    Route::prefix("tree")->group(function (){
        Route::get("list", [TreeController::class, 'index']);
        Route::get("list/{id}", [TreeController::class, 'getById']);
        Route::post("create", [TreeController::class, 'create']);
        Route::put("update", [TreeController::class, 'update']);
        Route::put("delete", [TreeController::class, 'delete']);
        Route::post("search", [TreeController::class, 'search']);
//        Route::get("id", [TreeController::class, 'auto_id']);
    });
    Route::prefix("plan")->group(function (){
        Route::get("list", [PlanController::class, 'index']);
        Route::post("create", [PlanController::class, 'create']);
        Route::put("update", [PlanController::class, 'update']);
        Route::post("search", [PlanController::class, 'search']);
        Route::delete("delete/{id}", [PlanController::class, 'delete']);
    });
    Route::prefix("staff")->group(function (){
        Route::get("list",[StaffController::class, 'getAllByRole']);
    });
    Route::prefix("statistic")->group(function(){
        Route::post("tree", [StatisticController::class, 'statisticTree']);
        Route::get("trouble", [StatisticController::class, 'statisticTrouble']);
        Route::get("plan", [StatisticController::class, 'statisticPlan']);
        Route::get("staff-by-plan", [StatisticController::class, 'getStaffByPlan']);
    });
});
