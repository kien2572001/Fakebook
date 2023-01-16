<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
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
        $googleUser  = Socialite::driver('google')->stateless()->user();
        $userData = $googleUser->user;
        $user = User::where('email', $googleUser->email)->first();
        if (!$user) {
            $user = new User();
            $user->first_name = $userData['given_name'];
            $user->last_name = $userData['family_name'];
            $user->avatar = $userData['picture'];
            $user->email = $userData['email'];
            $user->password = Hash::make('123456');
            $user->social_id = $userData['id'];
            $user->social_type = 'google';
            $user->save();
        }

        $token = auth()->login($user);

        return response()->json(
            [
                'status' => 'success',
                'user' => $user,
                'googleUser' => $userData,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ],
            ],
            200
        );
    }
}
