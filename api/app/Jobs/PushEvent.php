<?php

namespace App\Jobs;

use App\Events\realTimeNotification;
use App\Models\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PushEvent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $userSrc;
    protected $userTarget;
    protected $notification;

    /**
     * Create a new job instance.
     *
     * @param $userSrc
     * @param $userTarget
     * @param $signal
     * @param $type
     *
     * @return void
     */

    public function __construct($userSrc, $userTarget, $signal, $type, $notificationable_id = null, $notificationable_type = null)
    {
        $notification = new Notification();
        $notification->user_src = $userSrc;
        $notification->user_target = $userTarget;
        $notification->signal = $signal;
        $notification->type = $type;
        $notification->notificationable_id = $notificationable_id;
        $notification->notificationable_type = $notificationable_type;
        $notification->save();
        $this->userSrc = $userSrc;
        $this->userTarget = $userTarget;
        $this->notification = $notification;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        event(new realTimeNotification($this->userSrc, $this->userTarget, $this->notification));
    }
}
