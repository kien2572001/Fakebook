<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory, UuidTrait;

    protected $table = 'groups';

    protected $fillable = [
        'title',
        'profile_image',
        'content',
    ];

    public function groupPosts()
    {
        return $this->hasMany(GroupPost::class);
    }

    public function groupMembers()
    {
        return $this->hasMany(GroupMember::class);
    }
}
