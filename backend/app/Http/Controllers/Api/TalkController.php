<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Talk;
use Illuminate\Http\JsonResponse;

class TalkController extends Controller
{
    // GET /api/talks -> lista de charlas con sus plazas libres
    public function index(): JsonResponse
    {
        $talks = Talk::with('speaker')
            ->withCount($this->confirmedReservations())
            ->orderBy('starts_at')
            ->get();

        return response()->json($talks->map(fn (Talk $talk) => $this->format($talk)));
    }

    // GET /api/talks/{talk} -> detalle de una charla (404 si no existe)
    public function show(Talk $talk): JsonResponse
    {
        $talk->load('speaker')->loadCount($this->confirmedReservations());

        return response()->json($this->format($talk));
    }

    // Cuenta solo las reservas confirmadas: una reserva cancelada no ocupa plaza
    private function confirmedReservations(): array
    {
        return [
            'reservations as confirmed_count' => fn ($query) => $query->where('status', Reservation::STATUS_CONFIRMED),
        ];
    }

    // Datos que se envían al frontend; plazas libres = aforo - reservas confirmadas
    private function format(Talk $talk): array
    {
        return [
            'id' => $talk->id,
            'title' => $talk->title,
            'description' => $talk->description,
            'speaker' => $talk->speaker?->name,
            'starts_at' => $talk->starts_at,
            'ends_at' => $talk->ends_at,
            'room' => $talk->room,
            'capacity' => $talk->capacity,
            'available_seats' => max(0, $talk->capacity - $talk->confirmed_count),
        ];
    }
}
