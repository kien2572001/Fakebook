<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return response()->json(
            ['data' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl()]
        );
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();
        dd($user);
    }
}
