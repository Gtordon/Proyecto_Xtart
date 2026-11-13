<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\TalkController;
use Illuminate\Support\Facades\Route;

Route::get('/talks', [TalkController::class, 'index']);
Route::get('/talks/{talk}', [TalkController::class, 'show']);

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');

Route::middleware('auth.token')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/talks/{id}/reservations', [ReservationController::class, 'store'])->whereNumber('id');
    Route::get('/reservations', [ReservationController::class, 'index']);
});