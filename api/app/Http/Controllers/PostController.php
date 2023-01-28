<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Post;
use App\Models\SubPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function getListPostInProfile(Request $request)
    {
        $validate = $request->validate([
            'user_id' => 'required|string',
        ]);

        $user_id = $request->user_id;

        $posts = Post::with('image', 'subPosts.image', 'reactions.user', 'user')->orderBy('created_at', 'desc')->get();

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
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $imagePath = 'images/'.$imageName;
                $path = Storage::disk('s3')->put($imagePath, file_get_contents($image));
                $image = new Image();
                $image->path = Storage::disk('s3')->url($imagePath);
                $image->imageable_id = $post->id;
                $image->imageable_type = 'App\Models\Post';
                $image->save();
            } elseif ($request->has('media_length')) {
                $media_length = $request->media_length;
                for ($i = 0; $i < $media_length; $i++) {
                    $image = $request->file('media_'.$i);
                    $imageName = time().'.'.$image->getClientOriginalExtension();
                    $imagePath = 'images/'.$imageName;
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

        return response()->json([
            'status' => 'error',
            'message' => "You don't have permission to create this post",
        ], 404);
    }

    public function getCommentsOfPostById(Request $request, $id){
        try {
            //code...
            $post = Post::find($id);
            $comments = $post->comments;
            $comments->load('user')->load('reactions.user');
            return response()->json([
                'status' => 'success',
                'data' => $comments,
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    
}
