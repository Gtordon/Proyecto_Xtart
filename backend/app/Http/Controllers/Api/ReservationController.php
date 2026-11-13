<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ReservationException;
use App\Http\Controllers\Controller;
use App\Services\ReservationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function __construct(private ReservationService $reservations)
    {
    }

    // POST /api/talks/{id}/reservations -> reservar una plaza
    public function store(Request $request, int $id): JsonResponse
    {
        try {
            $reservation = $this->reservations->reserve($request->user(), $id);
        } catch (ReservationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'code' => $e->errorCode,
            ], $e->status);
        }

        return response()->json([
            'id' => $reservation->id,
            'talk_id' => $reservation->talk_id,
            'status' => $reservation->status,
        ], 201);
    }
}