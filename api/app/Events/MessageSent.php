<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user_src;
    public $user_target;
    public $message;

    public function __construct($user_src, $user_target, $message)
    {
        $this->message = $message;
        $this->user_src = $user_src;
        $this->user_target = $user_target;
    }

    public function broadcastOn()
    {
        $channel = 'chat'.$this->user_target;

        return [$channel];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
