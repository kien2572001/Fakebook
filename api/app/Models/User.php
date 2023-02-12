<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, UuidTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        //'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

     /**
      * Get the identifier that will be stored in the subject claim of the JWT.
      *
      * @return mixed
      */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function friends()
    {
        return $this->hasMany(UserFriend::class, 'source_id');
    }

    public function friendOf()
    {
        return $this->hasMany(UserFriend::class, 'target_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
