<?php

namespace App\Http\Middleware;

use App\Models\User;
use Cache;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            Cache::put('is_online'.Auth::user()->id, true, $expireTime);

            //Last seen
            User::where('id', Auth::user()->id)->update(['last_seen' => Carbon::now()]);
        }

        return $next($request);
    }
}
