<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $message;
    public $user_src;
    public $user_target;
   
    public function __construct($user_src, $message)
    {
        $this->message = $message;
        $this->user_src = $user_src;
        
    }
    public function broadcastOn()
    {
        return ['1chat'];
    }
    public function broadcastAs()
    {
        return 'message-sent';
    }
}
