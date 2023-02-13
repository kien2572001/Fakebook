<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use App\Traits\UuidTrait;

class SnakeGame extends Model
{
    use HasFactory, UuidTrait;

    protected $table = 'snake_games';

    protected $fillable = [
        'user_id',
        'score',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
