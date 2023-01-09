<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{
    //
    public function show($id){
        $user = User::find($id);
        if ($user) {
            return response()->json([
                'status' => 'success',
                'data' => new UserResource($user)
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }
}
