<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reaction;
use Illuminate\Support\Facades\Auth;

class ReactionController extends Controller
{
    //
    public function createReaction(Request $request){
        $isAuth = Auth::check();
        if ($isAuth){
            $validate = $request->validate([
                'reactionable_id' => 'required|string',
                'reactionable_type' => 'required|string',
                'reaction' => 'required|string',
            ]);
    
            $reactionable_id = $request->reactionable_id;
            $reactionable_type = $request->reactionable_type;
            $type = $request->reaction;
    
            $reaction = new Reaction();
            $reaction->reactionable_id = $reactionable_id;
            $reaction->reactionable_type = $reactionable_type;
            $reaction->reaction = $type;
            $reaction->user_id = Auth::user()->id;
            $reaction->save();
            $reaction->load('user');
    
            return response()->json([
                'status' => 'success',
                'data' => $reaction,
            ], 200);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'You are not logged in',
            ], 401);
        }
    }

    public function deleteReaction(Request $request){
        $isAuth = Auth::check();
        if ($isAuth){
            $validate = $request->validate([
                'reactionable_id' => 'required|string',
            ]);
    
            $reactionable_id = $request->reactionable_id;
            $userId = Auth::user()->id;
            $reaction = Reaction::where('reactionable_id', $reactionable_id)->where('user_id', $userId)->first();
            $deletedId = $reaction->id;
            $reaction->delete();
    
            if ($reaction){
                return response()->json([
                    'status' => 'success',
                    'message' => 'Reaction deleted',
                    'data' => $deletedId,
                ], 200);
            }
            else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reaction not found',
                ], 404);
            }
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'You are not logged in',
            ], 401);
        }
    }
}
