<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Reserva de un usuario en una charla (tabla `reservations`).
 * Una reserva cancelada no ocupa plaza.
 */
class Reservation extends Model
{
    public const STATUS_CONFIRMED = 'confirmed';
    public const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'user_id',
        'talk_id',
        'status',
        'reference',
        'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'cancelled_at' => 'datetime',
        ];
    }

    // Usuario que hizo la reserva
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Charla reservada
    public function talk(): BelongsTo
    {
        return $this->belongsTo(Talk::class);
    }

    // Validación de entrada (QR) de esta reserva
    public function attendance(): HasOne
    {
        return $this->hasOne(Attendance::class);
    }
}
