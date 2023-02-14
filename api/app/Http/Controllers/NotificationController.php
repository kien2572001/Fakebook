<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getNotification()
    {
        $isAuth = Auth::check();
        if ($isAuth) {
            $notifications = Notification::with('userSrc')->where('user_target', Auth::user()->id)->orderBy('created_at', 'desc')->get();
            $notifications = $notifications->map(function ($notification) {
                $user = [
                    'id' => $notification->userSrc->id,
                    'name' => $notification->userSrc->first_name.' '.$notification->userSrc->last_name,
                    'avatar' => $notification->userSrc->avatar,
                ];

                return [
                    'notification' =>
                    [
                        'id' => $notification->id,
                        'user_src' => $user,
                        'signal' => $notification->signal,
                        'type' => $notification->type,
                        'created_at' => $notification->created_at,
                        'notificationable_id' => $notification->notificationable_id,
                        'notificationable_type' => $notification->notificationable_type,
                    ],
                    'user_src' => $notification->user_src,
                    'user_target' => $notification->user_target,
                ];
            });

            return response()->json([
                'status' => 'success',
                'data' => $notifications,
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Unauthorized',
        ], 401);
    }
}
