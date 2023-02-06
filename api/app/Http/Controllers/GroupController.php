<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use Illuminate\Http\Request;
use App\Enums\GroupMemberStatusEnum;
use Illuminate\Support\Facades\Storage;
use Termwind\Components\Dd;

class GroupController extends Controller
{
    public function getListGroup()
    {
        return response()->json([
            'message' => 'Get all groups success',
            'data' => Group::all()
        ], 200);
    }

    public function getMyGroups()
    {
        $userId = auth()->user()->id;
        $groups = GroupMember::where('user_id', $userId)
            ->where('status', true)
            ->get()
            ->map(function ($groupMember) {
                return $groupMember->group;
            });
        return response()->json([
            'message' => 'Get my groups success',
            'data' => $groups
        ], 200);
    }

    public function getListMemberOfGroup($id)
    {
        $group = Group::find($id);
        if (!$group) return response()->json([
            'message' => 'Group not found',
            'data' => null
        ], 404);
        $members = $group->groupMembers;
        return response()->json([
            'message' => 'Get list member of group success',
            'data' => $members
        ], 200);
    }

    public function getListPostOfGroup($id)
    {
        $group = Group::find($id);
        if (!$group) return response()->json([
            'message' => 'Group not found',
            'data' => null
        ], 404);
        $posts = $group->groupPosts;
        return response()->json([
            'message' => 'Get list post of group success',
            'data' => $posts
        ], 200);
    }

    public function createGroup(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'profile_image' => 'required',
        ]);
        $group = new Group();
        $group->title = $request->title;
        $group->content = $request->content;
        if ($request->hasFile('profile_image')) {
            $avatar = $request->file('profile_image');
            $avatarName = time() . '.' . $avatar->getClientOriginalExtension();
            $avatarPath = 'images/avatars/' . $avatarName;
            $path = Storage::disk('s3')->put($avatarPath, file_get_contents($avatar));
            if (!$path) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Error uploading avatar',
                ], 500);
            }

            $path = Storage::disk('s3')->url($avatarPath);
            $group->profile_image = $path;
        }
        $group->profile_image = $request->profile_image;
        $group->save();
        if (!$group) return response()->json([
            'message' => 'Create group failed',
            'data' => null
        ], 500);
        $userId  = auth()->user()->id;
        GroupMember::create([
            'user_id' => $userId,
            'group_id' => $group->id,
            'role' => GroupMemberStatusEnum::ADMIN->value,
        ]);

        return response()->json([
            'message' => 'Create group success',
            'data' => null
        ], 200);
    }

    public function joinGroup(Request $request)
    {
        $request->validate([
            'group_id' => 'required',
        ]);
        $groupId = $request->group_id;
        $userId  = auth()->user()->id;
        $groupMember = GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->first();
        if ($groupMember) {
            return response()->json([
                'message' => 'You have already joined this group',
                'data' => null
            ], 200);
        }
        GroupMember::create([
            'user_id' => $userId,
            'group_id' => $groupId,
            'role' => GroupMemberStatusEnum::MEMBER->value,
        ]);
        return response()->json([
            'message' => 'Join group success',
            'data' => null
        ], 200);
    }

    public function leaveGroup(Request $request)
    {
        $request->validate([
            'group_id' => 'required',
        ]);
        $groupId = $request->group_id;
        $userId  = auth()->user()->id;
        $groupMember = GroupMember::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->first();
        if (!$groupMember) {
            return response()->json([
                'message' => 'You have not joined this group',
                'data' => null
            ], 200);
        }
        if ($groupMember->role == GroupMemberStatusEnum::ADMIN->value) {
            return response()->json([
                'message' => 'You are admin of this group',
                'data' => null
            ], 200);
        }
        $groupMember->delete();
        return response()->json([
            'message' => 'Leave group success',
            'data' => null
        ], 200);
    }

    public function update(Request $request)
    {
        $group = Group::find($request->id);
        $group->title = $request->title;
        $group->content = $request->content;
        if ($request->hasFile('profile_image')) {
            $avatar = $request->file('profile_image');
            $avatarName = time() . '.' . $avatar->getClientOriginalExtension();
            $avatarPath = 'images/avatars/' . $avatarName;
            $path = Storage::disk('s3')->put($avatarPath, file_get_contents($avatar));
            if (!$path) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Error uploading avatar',
                ], 500);
            }

            $path = Storage::disk('s3')->url($avatarPath);
            $group->profile_image = $path;
        }
        $group->save();
        return response()->json([
            'message' => 'Update group success',
            'data' => null
        ], 200);
    }

    public function createPostInGroup(Request $request)
    {
        $group = Group::find($request->group_id);
        if (!$group) return response()->json([
            'message' => 'Group not found',
            'data' => null
        ], 404);
        $post = $group->groupPosts()->create([
            'content' => $request->content,
            'user_id' => auth()->user()->id,
        ]);
        return response()->json([
            'message' => 'Create post in group success',
            'data' => $post
        ], 200);
    }
}
