<?php

namespace App\Http\Controllers;

use App\Enums\NotificationType;
use App\Enums\UserFriendStatusEnum;
use App\Events\realTimeNotification;
use App\Http\Requests\UserFriendRequest;
use App\Models\Notification;
use App\Models\User;
use App\Models\UserFriend;
use Illuminate\Http\Request;

class UserFriendController extends Controller
{
    //used in contact bar
    public function getListFriend()
    {
        $userId  = auth()->user()->id;
        $friends = UserFriend::where([
            ['source_id', '=', $userId],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])
            ->orWhere([
                ['target_id', '=', $userId],
                ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
            ])
            ->get();

            $friends = $friends->map(function ($friend) use ($userId) {
                $relationId = $friend->id;
                $temp  = null;
                if ($friend->source_id === $userId) {
                    $temp = $friend->target;
                } else {
                    $temp = $friend->source;
                }

                return [
                    'id' => $temp->id,
                    'name' => $temp->first_name.' '.$temp->last_name,
                    'email' => $temp->email,
                    'avatar' => $temp->avatar,
                    'relation_id' => $relationId,
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $friends,
        ], 200);
    }

    public function getAllFriend(Request $request)
    {
        $userFriends = [];
        if ($request->has('accepted')){
            $userFriends  = [
                 UserFriendStatusEnum::ACCEPTED->value,
            ];
        }
        else {
            $userFriends  = [
                UserFriendStatusEnum::ACCEPTED->value,
                UserFriendStatusEnum::PENDING->value,
            ];
        }
        $userId  = auth()->user()->id;
        $friends = UserFriend::where('source_id', $userId)
            ->orWhere('target_id', $userId)
            ->whereIn('status', $userFriends)
            ->with('source', 'target')
            ->paginate(8);

        $temp = $friends->getCollection();
        $temp = $temp->map(function ($friend) use ($userId) {
            $relationId = $friend->id;
            $temp  = null;
            if ($friend->source_id === $userId) {
                $temp = $friend->target;
            } else {
                $temp = $friend->source;
            }

            return [
                'id' => $temp->id,
                'name' => $temp->first_name.' '.$temp->last_name,
                'email' => $temp->email,
                'avatar' => $temp->avatar,
                'relation_id' => $relationId,
                'status' => $friend->status,
            ];
        });
        $friends->setCollection($temp);

        return response()->json([
            'status' => 'success',
            'data' => $friends,
        ], 200);
    }

    public function getFriendSuggestions()
    {
        $userId  = auth()->user()->id;
        $haveRelationList = UserFriend::where('source_id', $userId)
            ->orWhere('target_id', $userId)
            ->get();

        $listID = $haveRelationList->map(function ($friend) use ($userId) {
            $temp  = null;
            if ($friend->source_id === $userId) {
                $temp = $friend->target_id;
            } else {
                $temp = $friend->source_id;
            }

            return $temp;
        });

        $friends = User::where('id', '!=', auth()->user()->id)->whereNotIn('id', $listID)->paginate(8);
        $temp = $friends->getCollection();
        $temp = $temp->map(function ($friend) {
            return [
                'id' => $friend->id,
                'name' => $friend->first_name.' '.$friend->last_name,
                'email' => $friend->email,
                'avatar' => $friend->avatar,
            ];
        });
        $friends->setCollection($temp);

        return response()->json([
            'status' => 'success',
            'data' => $friends,
        ], 200);
    }

    public function checkFriend($friendId)
    {
        $isAuth = auth()->check();
        if (!$isAuth) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not logged in',
            ], 400);
        }

        $userId = auth()->user()->id;

        $userFriendS1 = UserFriend::where('source_id', $userId)
            ->where('target_id', $friendId)
            ->first();

        $userFriendS2 = UserFriend::where('source_id', $friendId)
            ->where('target_id', $userId)
            ->first();

        if (isset($userFriendS1) || isset($userFriendS2)) {
            return response()->json([
                'status' => 'success',
                'message' => 'You are friends with this user',
                'data' => isset($userFriendS1) ? $userFriendS1 : $userFriendS2,
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'You are not friends with this user',
        ], 400);
    }

    public function getListRequest()
    {
        $userId  = auth()->user()->id;
        $friends = UserFriend::where('target_id', $userId)
            ->where('status', UserFriendStatusEnum::PENDING->value)
            ->get();
        $friends->load('source', 'target');

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

        if ($userFriend && $userFriend->status === UserFriendStatusEnum::PENDING->value) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already sent a request to this user',
            ], 400);
        }

        if ($userFriend && $userFriend->status === UserFriendStatusEnum::ACCEPTED->value) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are already friends with this user',
            ], 400);
        }

        if ($userFriend && $userFriend->status === UserFriendStatusEnum::REJECTED->value) {
            $userFriend->status = UserFriendStatusEnum::PENDING->value;
            $userFriend->save();

            $notification = new Notification();
            $notification->user_src = $userId;
            $notification->user_target = $friendId;
            $notification->type = NotificationType::FRIEND_REQUEST->value;
            $notification->signal = 'send a friend request to you';
            $notification->save();
            event(new realTimeNotification($userId, $friendId, $notification));

            return response()->json([
                'status' => 'success',
                'message' => 'Add friend successfully',
                'data' => $userFriend,
            ], 200);
        }

        $userFriend = new UserFriend();
        $userFriend->source_id = $userId;
        $userFriend->target_id = $friendId;
        $userFriend->status = UserFriendStatusEnum::PENDING->value;
        $userFriend->save();

        //add event notification
        $notification = new Notification();
        $notification->user_src = $userId;
        $notification->user_target = $friendId;
        $notification->type = NotificationType::FRIEND_REQUEST->value;
        $notification->signal = 'send a friend request to you';
        $notification->save();
        event(new realTimeNotification($userId, $friendId, $notification));

        return response()->json([
            'status' => 'success',
            'message' => 'Add friend successfully',
            'data' => $userFriend,
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

        $notification = new Notification();
            $notification->user_src = $userId;
            $notification->user_target = $friendId;
            $notification->type = NotificationType::FRIEND_ACCEPT->value;
            $notification->signal = 'accept your friend request';
            $notification->save();
            event(new realTimeNotification($userId, $friendId, $notification));

        return response()->json([
            'status' => 'success',
            'message' => 'Accept friend successfully',
            'data' => $userFriend,
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
            'data' => $userFriend,
        ], 200);
    }

    public function deleteFriend(Request $request)
    {
        $userId = auth()->user()->id;
        $friendId = $request->user_id;
        $userFriend = UserFriend::where([
            ['source_id', '=', $userId],
            ['target_id', '=', $friendId],
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
