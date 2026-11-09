<?php

use App\Http\Controllers\Api\TalkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas públicas: cualquiera puede ver las charlas
Route::get('/talks', [TalkController::class, 'index']);
Route::get('/talks/{talk}', [TalkController::class, 'show']);

// Ruta privada de ejemplo (necesita token)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
