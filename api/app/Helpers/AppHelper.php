<?php

namespace App\Helpers;
use App\Models\UserFriend;
use App\Enums\UserFriendStatusEnum;
use App\Models\User;
class AppHelper
{
    public static function countReactions($reactions)
    {
        $arr = [
            [
                'reaction' => 'like',
                'count' => 0,
                'listUser' => [],
            ],
            [
                'reaction' => 'love',
                'count' => 0,
                'listUser' => [],
            ],
            [
                'reaction' => 'haha',
                'count' => 0,
                'listUser' => [],
            ],
            [
                'reaction' => 'wow',
                'count' => 0,
                'listUser' => [],
            ],
            [
                'reaction' => 'sad',
                'count' => 0,
                'listUser' => [],
            ],
            [
                'reaction' => 'angry',
                'count' => 0,
                'listUser' => [],
            ],
        ];

        foreach ($reactions as $reaction) {
            $user = $reaction->user;
            $returnUSer = [
                'id' => $user->id,
                'name' => $user->first_name.' '.$user->last_name,
            ];
            $index = array_search($reaction->reaction, array_column($arr, 'reaction'));
            $arr[$index]['count'] += 1;
            array_push($arr[$index]['listUser'], $returnUSer);
        }

        usort($arr, function ($a, $b) {
            return $b['count'] <=> $a['count'];
        });

        return $arr;
    }

    public static function countMutualFriends($id1 ,$id2)
    {
        $friend1 = UserFriend::where([
            ['source_id', '=', $id1],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])->orWhere([
            ['target_id', '=', $id1],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])->get();

        $friend2 = UserFriend::where([
            ['source_id', '=', $id2],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])->orWhere([
            ['target_id', '=', $id2],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])->get();

        $friend1 = $friend1->map(function ($item) {
            if ($item->source_id == $id1) {
                return $item->target_id;
            } else {
                return $item->source_id;
            }
        });

        $friend2 = $friend2->map(function ($item) {
            if ($item->source_id == $id2) {
                return $item->target_id;
            } else {
                return $item->source_id;
            }
        });

        $mutualFriends = $friend1->intersect($friend2);

        return $mutualFriends->count();
    }

    public static function getMutualFriends($id1 ,$id2)
    {
        $friend1 = UserFriend::where([
            ['source_id', '=', $id1],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])->orWhere([
            ['target_id', '=', $id1],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])->get();

        $friend2 = UserFriend::where([
            ['source_id', '=', $id2],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])->orWhere([
            ['target_id', '=', $id2],
            ['status', '=', UserFriendStatusEnum::ACCEPTED->value],
        ])->get();

        $friend1 = $friend1->map(function ($item) use ($id1) {
            if ($item->source_id == $id1) {
                return $item->target_id;
            } else {
                return $item->source_id;
            }
        });

        $friend2 = $friend2->map(function ($item) use ($id2) {
            if ($item->source_id == $id2) {
                return $item->target_id;
            } else {
                return $item->source_id;
            }
        });

        $mutualFriends = $friend1->intersect($friend2);

        return User::whereIn('id', $mutualFriends)->select('id', 'first_name', 'last_name', 'avatar')->get();
    }
}
