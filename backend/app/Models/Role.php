<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Perfil de usuario (tabla `roles`): attendee, organizer o access_staff.
 */
class Role extends Model
{
    public const ATTENDEE = 'attendee';
    public const ORGANIZER = 'organizer';
    public const ACCESS_STAFF = 'access_staff';

    protected $fillable = [
        'name',
        'label',
    ];

    // Un perfil lo tienen muchos usuarios
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
