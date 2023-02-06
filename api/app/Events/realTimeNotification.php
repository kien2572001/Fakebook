<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class realTimeNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $user_src;
    public $user_target;
    public $notification;

    public function __construct($user_src, $user_target, $notification)
    {
        $user = User::find($user_src);
        $user = [
            'id' => $user->id,
            'name' => $user->first_name.' '.$user->last_name,
            'avatar' => $user->avatar,
        ];
        $this->notification = [
            'id' => $notification->id,
            'user_src' => $user,
            'signal' => $notification->signal,
            'type' => $notification->type,
            'created_at' => $notification->created_at,
        ];
        $this->user_src = $user_src;
        $this->user_target = $user_target;
    }

    public function broadcastOn()
    {
        return [$this->user_target];
    }

    public function broadcastAs()
    {
        return 'signal';
    }
}
