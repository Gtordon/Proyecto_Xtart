<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        $user = $token
            ? User::with('role')->where('api_token', hash('sha256', $token))->first()
            : null;

        if (! $user || ! $user->api_token_expires_at?->isFuture()) {
            return response()->json([
                'message' => 'No has iniciado sesión o tu sesión ha caducado.',
                'code' => 'unauthenticated',
            ], 401);
        }

        $request->setUserResolver(fn () => $user);

        return $next($request);
    }
}