<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class chatController extends Controller
{
   public function fetchMessages()
   {
      return Message::with('user')->get();
   }
   public function sendMessage(Request $request)
   {
      auth()->user()->messages()->create([
         'message' => $request->message
      ]);
      event(new MessageSent(auth()->user(), $request->message));
      return ['status' => 'Message Sent!'];
   }
   public function Test(Request $request)
   {
      return response()->json([
         'message' => 'Test',
         'data' => $request->all()
      ], 200);
   }
}
