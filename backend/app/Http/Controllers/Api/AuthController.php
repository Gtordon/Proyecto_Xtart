<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // si el correo y la contraseña son están bien, devuelve un token
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::with('role')->where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Correo o contraseña incorrectos.',
                'code' => 'invalid_credentials',
            ], 401);
        }

        return response()->json([
            'token' => $user->issueToken(),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role?->name,
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->forceFill([
            'api_token' => null,
            'api_token_expires_at' => null,
        ])->save();

        return response()->json(['message' => 'Sesión cerrada.']);
    }

    // GET /api/user -> quién soy
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role?->name,
        ]);
    }
}