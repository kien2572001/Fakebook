<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SnakeGame;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class SnakeController extends Controller
{
    //

    public function store(Request $request)
    {
        $users = Auth::user();
        $snakeGame = SnakeGame::create([
            'user_id' => $users->id,
            'score' => $request->score,
        ]);

        $snakeScores = SnakeGame::with('user')->orderBy('score', 'desc')->get()->take(10);
        $snakeScores = $snakeScores->map(function ($snakeScore) {
            return [
                'id' => $snakeScore->id,
                'user_id' => $snakeScore->user_id,
                'score' => $snakeScore->score,
                'name' => $snakeScore->user->first_name . ' ' . $snakeScore->user->last_name,
                'avatar' => $snakeScore->user->avatar,
            ];
        });

        return response()->json([
            'message' => 'Game saved successfully',
            'data' => $snakeScores,
        ]);
    }

    public function show()
    {
        $snakeScores = SnakeGame::with('user')->orderBy('score', 'desc')->get()->take(10);
        $snakeScores = $snakeScores->map(function ($snakeScore) {
            return [
                'id' => $snakeScore->id,
                'user_id' => $snakeScore->user_id,
                'score' => $snakeScore->score,
                'name' => $snakeScore->user->first_name . ' ' . $snakeScore->user->last_name,
                'avatar' => $snakeScore->user->avatar,
            ];
        });
        return response()->json([
            'status' => 'success',
            'data' => $snakeScores,
        ], 200);
    }
}
