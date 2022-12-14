<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebInit;
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

Route::get('/web-init', WebInit::class);

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});

Route::prefix('users')->group(function () {
    Route::get('/my-information', [UserController::class, 'getMyInformation']);
    Route::post('/modify-account-information', [UserController::class, 'modifyAccountInfomation']);
});


Route::resource('users', UserController::class)->only([
    'show',
]);


