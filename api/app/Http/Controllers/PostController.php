<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Post;
use App\Models\SubPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function getListPostInProfile(Request $request)
    {
        $validate = $request->validate([
            'user_id' => 'required|string',
        ]);

        $user_id = $request->user_id;

        $posts = Post::with('image', 'subPosts.image', 'reactions.user', 'user')->orderBy('created_at', 'desc')->get();
        $posts = $posts->map(function ($post) {
            $reactions = \App\Helpers\AppHelper::countReactions($post->reactions);
            $temp = [
                'id' => $post->id,
                'content' => $post->content,
                'user' => $post->user,
                'image' => $post->image ? $post->image->path : null,
                'sub_posts' => $post->subPosts,
                'reactions' => $reactions,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];
            return $temp;
        });

        return response()->json([
            'status' => 'success',
            'data' => $posts,
        ], 200);
    }

   

    public function createPost(Request $request)
    {
        $isAuth = Auth::check();
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
            $comments->load('user', 'reactions.user', 'image');
            $comments = $comments->map(function ($comment) {
                $reactions = \App\Helpers\AppHelper::countReactions($comment->reactions);
                $temp = [
                    'id' => $comment->id,
                    'content' => $comment->content,
                    'user' => $comment->user,
                    'image' => $comment->image ? $comment->image->path : null,
                    'reactions' => $reactions,
                    'created_at' => $comment->created_at,
                    'updated_at' => $comment->updated_at,
                ];
                return $temp;
            });
            return response()->json([
                'status' => 'success',
                'data' => $comments,
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    
}
