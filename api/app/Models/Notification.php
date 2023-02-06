<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory, UuidTrait;
    protected $table = 'notifications';

    protected $fillable = [
        'user_src',
        'user_target',
        'signal',
        'type',
    ];

    public function userSrc()
    {
        return $this->belongsTo(User::class, 'user_src');
    }

    public function userTarget()
    {
        return $this->belongsTo(User::class, 'user_target');
    }
}
