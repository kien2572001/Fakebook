<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    public function createComment(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'commentable_id' => 'required|uuid',
            'commentable_type' => 'required|string',
        ]);

        $comment = new Comment();
        $comment->content = $request->content;
        $comment->commentable_id = $request->commentable_id;
        $comment->commentable_type = $request->commentable_type;
        $comment->user_id = Auth::user()->id;
        $comment->save();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = 'images/'.$imageName;
            $path = Storage::disk('s3')->put($imagePath, file_get_contents($image));
            $image = new Image();
            $image->path = Storage::disk('s3')->url($imagePath);
            $image->imageable_id = $comment->id;
            $image->imageable_type = 'App\Models\Comment';
            $image->save();
        }

        return response()->json([
            'message' => 'Comment created successfully',
            'comment' => $comment->load('user', 'reactions.user', 'image'),
        ], 201);
    }

    public function getRepliesOfCommentById($id)
    {
        try {
            $comment = Comment::find($id);
            $replies = $comment->replies()->with('user', 'reactions.user', 'image')->get();
            $replies = $replies->map(function ($reply) {
                $reactions = \App\Helpers\AppHelper::countReactions($reply->reactions);
                return [
                    'id' => $reply->id,
                    'content' => $reply->content,
                    'user' => $reply->user,
                    'reactions' => $reactions,
                    'created_at' => $reply->created_at,
                    'updated_at' => $reply->updated_at,
                ];
            });

            return response()->json([
                'replies' => $replies,
                'status' => 'success',
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
