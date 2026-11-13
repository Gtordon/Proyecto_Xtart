<?php

namespace App\Services;

use App\Exceptions\ReservationException;
use App\Models\Reservation;
use App\Models\Role;
use App\Models\Talk;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReservationService
{
    public function reserve(User $user, int $talkId): Reservation
    {
        // Comprobación 1: solo los asistentes pueden reservar
        if ($user->role?->name !== Role::ATTENDEE) {
            throw new ReservationException('Solo los asistentes pueden reservar charlas.', 'forbidden_role', 403);
        }

        return DB::transaction(function () use ($user, $talkId) {

            
            $talk = Talk::whereKey($talkId)->lockForUpdate()->first();

         
            if (! $talk) {
                throw new ReservationException('No se ha encontrado la charla.', 'talk_not_found', 404);
            }

         
            if ($talk->starts_at->isPast()) {
                throw new ReservationException('Esta charla ya ha empezado.', 'talk_started', 409);
            }

            $yaReservada = Reservation::where('user_id', $user->id)
                ->where('talk_id', $talk->id)
                ->where('status', Reservation::STATUS_CONFIRMED)
                ->exists();

            if ($yaReservada) {
                throw new ReservationException('Ya tienes una reserva en esta charla.', 'already_reserved', 409);
            }

            
            $ocupadas = Reservation::where('talk_id', $talk->id)
                ->where('status', Reservation::STATUS_CONFIRMED)
                ->count();

            if ($ocupadas >= $talk->capacity) {
                throw new ReservationException('No quedan plazas libres en esta charla.', 'talk_full', 409);
            }
            
            return Reservation::create([
                'user_id' => $user->id,
                'talk_id' => $talk->id,
                'status' => Reservation::STATUS_CONFIRMED,
                'reference' => 'RES-' . strtoupper(Str::random(8)),
            ]);
        });
    }
}