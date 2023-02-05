<?php

namespace App\Helpers;

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
}
