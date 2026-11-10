<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    // Nombres de los perfiles (tabla `roles`, columna `name`)
    public const ROLE_ATTENDEE = 'attendee';
    public const ROLE_ORGANIZER = 'organizer';
    public const ROLE_ACCESS_STAFF = 'access_staff';
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'api_token',
        'api_token_expires_at',
    ];

    // Perfil del usuario
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    // ¿Tiene este perfil? Ej: $user->hasRole(User::ROLE_ORGANIZER)
    public function hasRole(string $name): bool
    {
        return $this->role?->name === $name;
    }

    public function issueToken(): string
    {
    $token = Str::random(60);

    $this->forceFill([
        'api_token' => hash('sha256', $token),
        'api_token_expires_at' => now()->addHours(8),   // la sesión dura 8 horas
    ])->save();

    return $token;
    }

    // Reservas del usuario
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'api_toke_expires_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
