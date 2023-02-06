<?php

namespace App\Http\Middleware;

<<<<<<< HEAD
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Cache;
=======
use Cache;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
>>>>>>> develop

class LastSeenUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $expireTime = Carbon::now()->addMinutes(1); // Keep online for 1 minute
<<<<<<< HEAD
            Cache::put('is_online' . Auth::user()->id, true, $expireTime);
=======
            Cache::put('is_online'.Auth::user()->id, true, $expireTime);
>>>>>>> develop

            //Last seen
            User::where('id', Auth::user()->id)->update(['last_seen' => Carbon::now()]);
        }
<<<<<<< HEAD
=======

>>>>>>> develop
        return $next($request);
    }
}
