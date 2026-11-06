<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Ponente de una o varias charlas (tabla `speakers`).
 */
class Speaker extends Model
{
    protected $fillable = [
        'name',
        'bio',
    ];

    // Un ponente puede dar varias charlas
    public function talks(): HasMany
    {
        return $this->hasMany(Talk::class);
    }
}
