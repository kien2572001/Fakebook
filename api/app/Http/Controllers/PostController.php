<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use App\Models\Image;
use App\Models\SubPost;

class PostController extends Controller
{
    //
    public function getListPostInProfile(Request $request){
        $validate = $request->validate([
            'user_id' => 'required|string',
        ]);

        $user_id = $request->user_id;

        $posts = Post::with('image','subPosts.image','reactions.user','comments','comments.reactions','comments.user','user')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $posts,
        ], 200);
    }

    public function createPost(Request $request)
    {
        $isAuth = Auth::check();
        //dd($request->all());
        if ($isAuth) {
            $user = Auth::user();
            $post = new Post();
            $post->content = $request->content;
            $post->user_id = $user->id;
            $post->save();

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $imagePath = 'images/' . $imageName;
                $path = Storage::disk('s3')->put($imagePath, file_get_contents($image));
                $image = new Image();
                $image->path = Storage::disk('s3')->url($imagePath);
                $image->imageable_id = $post->id;
                $image->imageable_type = 'App\Models\Post';
                $image->save();
            }
            else if ($request->has('media_length')) {
                $media_length = $request->media_length;
                for ($i = 0; $i < $media_length; $i++) {
                    $image = $request->file('media_' . $i);
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    $imagePath = 'images/' . $imageName;
                    $path = Storage::disk('s3')->put($imagePath, file_get_contents($image));
                    $subPost = new SubPost();
                    $subPost->post_id = $post->id;
                    $subPost->save();
                    $image = new Image();
                    $image->path = Storage::disk('s3')->url($imagePath);
                    $image->imageable_id = $subPost->id;
                    $image->imageable_type = 'App\Models\SubPost';
                    $image->save();
                }
            }
            return response()->json([
                'status' => 'success',
                'data' => $post,
            ], 200);
        }
        else {
            return response()->json([
                'status' => 'error',
                'message' => "You don't have permission to create this post",
            ], 404);
        }
    }
}
