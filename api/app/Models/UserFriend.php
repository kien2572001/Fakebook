<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFriend extends Model
{
    use HasFactory, UuidTrait;

    protected $fillable = [
        'source_id',
        'target_id',
        'type',
        'status',
    ];

    public function source()
    {
        return $this->belongsTo(User::class, 'source_id');
    }

    public function target()
    {
        return $this->belongsTo(User::class, 'target_id');
    }

}
