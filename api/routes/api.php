<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserFriendController;
use App\Http\Controllers\WebInit;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Resources\User;
use App\Models\User as ModelsUser;

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
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});

Route::prefix('users')->group(function () {
    Route::get('/my-information', [UserController::class, 'getMyInformation']);
    Route::get('/{id}/information', [UserController::class, 'getUserInformationForProfilePage']);
    Route::post('/modify-account-information', [UserController::class, 'modifyAccountInfomation']);
    Route::get('/test', [UserController::class, 'showall']);
    Route::get('/', function () {
        return response()->json([
            'status' => 'success',
            'message' => 'Get all users',
            'data' => ModelsUser::all()
        ], 200);
    });
});


Route::resource('users', UserController::class)->only([
    'show',
]);

Route::prefix('posts')->group(function () {
    Route::get('/list', [PostController::class, 'getListPostInProfile']);
    Route::post('/create', [PostController::class, 'createPost']);
    Route::get('/{id}/comments', [PostController::class, 'getCommentsOfPostById']);
});

Route::prefix('reactions')->group(function () {
    Route::post('/create', [ReactionController::class, 'createReaction']);
    Route::post('/delete', [ReactionController::class, 'deleteReaction']);
});


Route::prefix('comments')->group(function () {
    Route::post('/create', [CommentController::class, 'createComment']);
    Route::post('/delete', [CommentController::class, 'deleteComment']);
});

Route::prefix('friends')->group(function () {
    Route::get('/list', [UserFriendController::class, 'getAllFriend']);
    Route::get('/request', [UserFriendController::class, 'getListRequest']);
    Route::post('/add', [UserFriendController::class, 'addFriend']);
    Route::post('/accept', [UserFriendController::class, 'acceptFriend']);
    Route::post('/reject', [UserFriendController::class, 'rejectFriend']);
    Route::post('/delete', [UserFriendController::class, 'deleteFriend']);
    Route::get('/check/{friendId}', [UserFriendController::class, 'checkFriend']);
    Route::get('/', [UserFriendController::class, 'getListFriend']);
    
});
