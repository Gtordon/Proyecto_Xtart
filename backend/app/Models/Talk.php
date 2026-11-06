<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Charla del evento (tabla `talks`).
 */
class Talk extends Model
{
    // Columnas que se pueden rellenar con create() (protección mass assignment)
    protected $fillable = [
        'title',
        'description',
        'speaker_id',
        'starts_at',
        'ends_at',
        'room',
        'capacity',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'capacity' => 'integer',
        ];
    }

    // Ponente de la charla
    public function speaker(): BelongsTo
    {
        return $this->belongsTo(Speaker::class);
    }

    // Una charla tiene muchas reservas
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
