<?php

namespace App\Http\Controllers;

use App\Enums\NotificationType;
use App\Jobs\PushEvent;
use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReactionController extends Controller
{
    public function createReaction(Request $request)
    {
        $isAuth = Auth::check();
        if ($isAuth) {
            $validate = $request->validate([
                'reactionable_id' => 'required|string',
                'reactionable_type' => 'required|string',
                'reaction' => 'required|string',
            ]);
            $notification_target_id = $request->notification_target_id;
            $thisUserId = Auth::user()->id;
            $reactionable_id = $request->reactionable_id;
            $reactionable_type = $request->reactionable_type;
            $type = $request->reaction;

            $reaction = new Reaction();
            $reaction->reactionable_id = $reactionable_id;
            $reaction->reactionable_type = $reactionable_type;
            $reaction->reaction = $type;
            $reaction->user_id = $thisUserId;
            $reaction->save();

            if ($thisUserId !== $notification_target_id) {
                $signal = '';
                if ($reactionable_type === 'App\Models\Post') {
                    $signal = $type.' your post';
                } elseif ($reactionable_type === 'App\Models\Comment') {
                    $signal = $type.' your comment';
                }

                PushEvent::dispatch($thisUserId, $notification_target_id, $signal, NotificationType::REACTION->value, $reactionable_id, $reactionable_type);
            }

            $reaction->load('user');

            return response()->json([
                'status' => 'success',
                'data' => $reaction,
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'You are not logged in',
        ], 401);
    }

    public function deleteReaction(Request $request)
    {
        $isAuth = Auth::check();
        if ($isAuth) {
            $validate = $request->validate([
                'reactionable_id' => 'required|string',
            ]);

            $reactionable_id = $request->reactionable_id;
            $userId = Auth::user()->id;
            $reaction = Reaction::where('reactionable_id', $reactionable_id)->where('user_id', $userId)->first();
            $reaction->delete();

            if ($reaction) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Reaction deleted',
                    'data' => $reaction,
                ], 200);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Reaction not found',
            ], 404);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'You are not logged in',
        ], 401);
    }
}
