<?php

namespace App\Http\Controllers;

class WebInit extends Controller
{
    public function __invoke()
    {

        return response()->json([
            'data' => 'Hello World'
        ]);
    }
}
