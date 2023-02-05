<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class realTimeNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $user_src;
    public $user_target;
    public $signal;
    public function __construct($user_src, $user_target,$signal)
    {
        $this->signal = $signal;
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
