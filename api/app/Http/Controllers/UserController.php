<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;
use App\Models\SubPost;

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

        return response()->json([
            'status' => 'error',
            'message' => 'User not found',
        ], 404);
    }

    public function getMax6PhotoForProfile(
        Request $request,
        $id
    ) {
        $user = User::find($id);
        if ($user) {
            $posts = $user->posts();
            $subPosts = $posts->with('subPosts.image')->orderBy('created_at', 'desc')->get()->pluck('subPosts')->flatten();
            $subPosts = $subPosts->map(function ($subPost) {
                return [
                    'sub_post_id' => $subPost->id,
                    'image_id' => $subPost->image ? $subPost->image->id : null,
                    'image' => $subPost->image ? $subPost->image->path : null,
                ];
            });

            $subPosts = $subPosts->take(6);

            return response()->json([
                'status' => 'success',
                'data' => $subPosts,
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'User not found',
        ], 404);
    }

    public function getAllPhotoForProfile(Request $request,$id)
    {
        $user = User::find($id);
        if ($user) {
            $posts = $user->posts();
            $subPosts = $posts->with('subPosts.image')->orderBy('created_at', 'desc')->get()->pluck('subPosts')->flatten();
            $subPosts = $subPosts->map(function ($subPost) {
                return [
                    'sub_post_id' => $subPost->id,
                    'image_id' => $subPost->image ? $subPost->image->id : null,
                    'image' => $subPost->image ? $subPost->image->path : null,
                ];
            });

            $subPosts = collect($subPosts)->paginate(8);

            return response()->json([
                'status' => 'success',
                'data' => $subPosts,
            ], 200);
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

    public function getMentionsList(Request $request)
    {
        // $validate = $request->validate([
        //     'name' => 'required|string|max:255',
        //     'range' => 'required|string|contains:all,friend',
        // ]);
        // if ($validate->fails()) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Invalid request',
        //     ], 400);
        // }
        // Search user by name = first_name + last_name
        //$users = User::whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$request->name}%"])->get();
        if ($request->range === 'friend') {
            $user = Auth::user();
            $users = $user->friends()->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$request->name}%"])->get();
        } else {
            $users = User::whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$request->name}%"])->get();
        }

        return response()->json([
            'status' => 'success',
            'data' => $users,
        ], 200);
    }
}
