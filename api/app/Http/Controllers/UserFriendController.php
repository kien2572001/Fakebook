<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserFriend;
use App\Enums\UserFriendStatusEnum;
use App\Http\Requests\UserFriendRequest;

class UserFriendController extends Controller
{
    public function getListFriend()
    {
        $userId  = auth()->user()->id;
        $friends = UserFriend::where('source_id', $userId)
            ->where('status', UserFriendStatusEnum::ACCEPTED->value)
            ->orWhere('target_id', $userId)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $friends,
        ], 200);
    }

    public function  getAllFriend()
    {
    }

    public function getListRequest()
    {
        $userId  = auth()->user()->id;
        $friends = UserFriend::where('target_id', $userId)
            ->where('status', UserFriendStatusEnum::PENDING->value)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $friends,
        ], 200);
    }

    public function addFriend(UserFriendRequest $request)
    {
        $userId = auth()->user()->id;
        $friendId = $request->target_id;
        $userFriend = UserFriend::where('source_id', $userId)
            ->where('target_id', $friendId)
            ->first();

        if ($userFriend) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already sent a request to this user',
            ], 400);
        }
        $userFriend = new UserFriend();
        $userFriend->source_id = $userId;
        $userFriend->target_id = $friendId;
        $userFriend->status = UserFriendStatusEnum::PENDING->value;
        $userFriend->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Add friend successfully',
        ], 200);
    }

    public function acceptFriend(Request $request)
    {
        $userId = auth()->user()->id;
        $friendId = $request->user_id;
        $userFriend = UserFriend::where('source_id', $friendId)
            ->where('target_id', $userId)
            ->first();

        if (!$userFriend) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have not received a request from this user',
            ], 400);
        }
        $userFriend->status = UserFriendStatusEnum::ACCEPTED->value;
        $userFriend->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Accept friend successfully',
        ], 200);
    }

    public function rejectFriend(Request $request)
    {
        $userId = auth()->user()->id;
        $friendId = $request->user_id;
        $userFriend = UserFriend::where('source_id', $friendId)
            ->where('target_id', $userId)
            ->first();

        if (!$userFriend) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have not received a request from this user',
            ], 400);
        }
        $userFriend->status = UserFriendStatusEnum::REJECTED->value;
        $userFriend->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Reject friend successfully',
        ], 200);
    }
    public function deleteFriend(Request $request)
    {
        $userId = auth()->user()->id;
        $friendId = $request->user_id;
        $userFriend = UserFriend::where([
            ['source_id', '=', $userId],
            ['target_id', '=', $friendId]
        ])
            ->orWhere([
                ['source_id', '=', $friendId],
                ['target_id', '=', $userId],
            ])
            ->first();
        if (!$userFriend) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have not received a request from this user',
            ], 400);
        }
        $userFriend->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Delete friend successfully',
        ], 200);
    }
}
