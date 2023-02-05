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
    
    public $user_src;
    public $user_target;
    public $message;
   
    public function __construct($user_src, $user_target,$message )
    {
        $this->message = $message;
        $this->user_src = $user_src;
        $this->user_target = $user_target;
    }
    public function broadcastOn()
    {
        if($this->user_src[0]>$this->user_target[0])
            $chanel = substr($this->user_src,0,3).substr($this->user_target,0,3);
        else
            $chanel = substr($this->user_target,0,3).substr($this->user_src,0,3);
        return [$chanel];
        //return ['chat'];
    }
    public function broadcastAs()
    {
        return 'message';
    }
}
