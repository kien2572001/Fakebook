<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function showall()
    {
        $users = User::all();

        return response()->json($users, 200);
    }

    public function show($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json([
                'status' => 'success',
                'data' => new UserResource($user),
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'User not found',
        ], 404);
    }

    public function getMyInformation(Request $request)
    {
        $isAuth = Auth::check();
        if ($isAuth) {
            $user = Auth::user();

            return response()->json([
                'status' => 'success',
                'data' => new UserResource($user),
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => "You don't have permission to get this account",
        ], 404);
    }

    public function getUserInformationForProfilePage(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json([
                'status' => 'success',
                'data' => new UserResource($user),
            ], 200);
        }
        else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }
    }

    public function modifyAccountInfomation(Request $request)
    {
        $isAuth = Auth::check();
        if ($isAuth) {
            $user = Auth::user();
            $user->last_name = $request->lastName;
            $user->first_name = $request->firstName;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->city = $request->city;
            $user->country = $request->country;
            $user->about = $request->about;
            $user->gender = $request->gender;
            //save image object to AWS
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $avatarName = time().'.'.$avatar->getClientOriginalExtension();
                $avatarPath = 'images/avatars/'.$avatarName;
                $path = Storage::disk('s3')->put($avatarPath, file_get_contents($avatar));
                if (!$path) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Error uploading avatar',
                    ], 500);
                }

                $path = Storage::disk('s3')->url($avatarPath);
                $user->avatar = $path;
            }

            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Account information updated successfully',
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => "You don't have permission to modify this account",
        ], 404);
    }
}
