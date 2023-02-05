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
      // $message = new Message();
      // $message->user_src = $request->input('user_src');
      // $message->user_target = $request->input('user_target');
      // $message->message = $request->input('message');
      event(new MessageSent($request->input('user_src'),$request->input('user_target'),$request->input('message')));
      return "connect successfully";
   }

   public function Test(Request $request)
   {
      $data = Message::all();
      return response()->json([
         'message' => 'Test',
         'data' => $data
      ], 200);
   }
   public function getAllMessage(Request $request)
   {
      $user_src = $request->input('user_src');
      $user_target = $request->input('user_target');
      $messages = Message::where('user_src', $user_src)->where('user_target', $user_target)->orWhere('user_src', $user_target)->where('user_target', $user_src)->get();
      return response()->json([
         'message' => 'Test',
         'data' => $messages
      ], 200);
   }
}
