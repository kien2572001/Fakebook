<?php

namespace App\Http\Controllers;

use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\realTimeNotification;
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

            $reactionable_id = $request->reactionable_id;
            $reactionable_type = $request->reactionable_type;
            $type = $request->reaction;
            $notification_target_id = $request->notification_target_id;

            $reaction = new Reaction();
            $reaction->reactionable_id = $reactionable_id;
            $reaction->reactionable_type = $reactionable_type;
            $reaction->reaction = $type;
            $reaction->user_id = Auth::user()->id;
            $reaction->save();
            event(new realTimeNotification(Auth::user()->id, $notification_target_id, 'like your post'));
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
