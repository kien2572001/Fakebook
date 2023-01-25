<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReactionController extends Controller
{
    //
    public function createReaction(Request $request){
        $isAuth = Auth::check();
        if ($isAuth){
            $validate = $request->validate([
                'reactionable_id' => 'required|string',
                'reactionable_type' => 'required|string',
                'type' => 'required|string',
            ]);
    
            $reactionable_id = $request->reactionable_id;
            $reactionable_type = $request->reactionable_type;
            $type = $request->type;
    
            $reaction = new Reaction();
            $reaction->reactionable_id = $reactionable_id;
            $reaction->reactionable_type = $reactionable_type;
            $reaction->type = $type;
            $reaction->user_id = Auth::user()->id;
            $reaction->save();
    
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
            $reaction->delete();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Reaction removed'
            ], 200);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'You are not logged in',
            ], 401);
        }
    }
}
