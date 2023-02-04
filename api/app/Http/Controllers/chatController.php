<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\MessageSent;
class chatController extends Controller
{
   public function fetchMessages()
   {
      return Message::with('user')->get();
   }
   public function sendMessage(Request $request)
   {
      //  Message::create([
      //    'message' => $request->message,
      //    'user_src' => $request->user_src,
      //    'user_target' => $request->user_target
      //  ]);
      // event(new MessageSent($request->user_src, $request->user_target, $request->message))->toOthers();
      event(new MessageSent($request->input('user_src'),$request->input('user_target'),$request->input('message')));
      return "connect successfully";
   }
   public function Test(Request $request)
   {
      return response()->json([
         'message' => 'Test',
         'data' => $request->all()
      ], 200);
   }
}
