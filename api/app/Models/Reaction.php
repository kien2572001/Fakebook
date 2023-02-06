<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use HasFactory, UuidTrait;

    protected $table = 'reactions';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reactionable()
    {
        return $this->morphTo();
    }
}
