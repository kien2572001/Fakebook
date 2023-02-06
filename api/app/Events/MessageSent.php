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
    public $relation_id;

    public function __construct($user_src, $user_target, $message, $relation_id)
    {
        $this->message = $message;
        $this->user_src = $user_src;
        $this->user_target = $user_target;
        $this->relation_id = $relation_id;
    }

    public function broadcastOn()
    {
        $channel = $this->relation_id;

        return [$channel];
        //return ['chat'];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
