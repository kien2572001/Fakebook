<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory, UuidTrait;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'images';

    public function imageable()
    {
        return $this->morphTo();
    }
}
