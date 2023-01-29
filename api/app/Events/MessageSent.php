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
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( $message, $user_src, $user_target)
    {
        $this->message = $message;
        $this->user_src = $user_src;
        $this->user_target = $user_target;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return [ 
            new PrivateChannel('1chat'.$this.user_src),
            new PrivateChannel('1chat'.$this.user_target)
        ];
    }
}
