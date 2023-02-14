<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Jobs\SendNotification;
use App\Enums\NotificationType;
use App\Models\Post;
use App\Models\Reaction;
use App\Models\User;
use App\Jobs\PushEvent;

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

        $notification_target_id = null;
        if ($request->commentable_type === 'App\Models\Post') {
            $notification_target_id =  Post::find($request->commentable_id)->user_id;
            $link = $request->commentable_id;
        } elseif ($request->commentable_type === 'App\Models\Comment') {
            $post = Comment::find($request->commentable_id)->commentable;
            $notification_target_id = $post->user_id;
            $link = $post->id;
        }
        $thisUserId = Auth::user()->id;
        $commentable_id = $request->commentable_id;
        $commentable_type = $request->commentable_type;
        if ($thisUserId !== $notification_target_id){
            $signal = '';
            if ($commentable_type === 'App\Models\Post') {    
                $signal = 'commented on your post';
            } elseif ($commentable_type === 'App\Models\Comment') {
                $signal = 'replied to your comment';
            }
            PushEvent::dispatch($thisUserId, $notification_target_id, $signal, 'comment', $link, $commentable_type);
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
