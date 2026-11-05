<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Asistencia: registro de que una reserva se validó en la puerta (tabla `attendances`).
 */
class Attendance extends Model
{
    protected $fillable =[
        'reservation_id',
        'validated_by',
        'validated_at',
    ];

    protected function casts(): array{
        
        return [
            'validated_at' => 'datetime',
        ];
    }

    // Reserva validada
    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    // Personal de acceso que validó la entrada
    public function validator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validated_by');
    }
}
