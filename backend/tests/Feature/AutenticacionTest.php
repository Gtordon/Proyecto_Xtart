<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AutenticacionTest extends TestCase
{
    use RefreshDatabase;

    protected $seed = true;

    public function test_login_correcto_devuelve_token_y_usuario(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'ana@sabitech.test',
            'password' => 'password',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['token', 'user' => ['id', 'name', 'email', 'role']])
            ->assertJsonPath('user.role', 'attendee');
    }

    public function test_login_con_contrasena_incorrecta_devuelve_401(): void
    {
        $this->postJson('/api/login', [
            'email' => 'ana@sabitech.test',
            'password' => 'mala',
        ])->assertStatus(401)->assertJsonPath('code', 'invalid_credentials');
    }

    public function test_login_sin_datos_devuelve_422(): void
    {
        $this->postJson('/api/login', [])
            ->assertStatus(422)
            ->assertJsonPath('code', 'validation_failed')
            ->assertJsonStructure(['message', 'code', 'errors' => ['email', 'password']]);
    }

    public function test_ruta_protegida_sin_token_devuelve_401(): void
    {
        $this->getJson('/api/user')
            ->assertStatus(401)
            ->assertJsonPath('code', 'unauthenticated');
    }

    public function test_usuario_autenticado_puede_consultar_sus_datos(): void
    {
        $token = $this->postJson('/api/login', [
            'email' => 'ana@sabitech.test',
            'password' => 'password',
        ])->json('token');

        $this->withToken($token)->getJson('/api/user')
            ->assertOk()
            ->assertJsonPath('email', 'ana@sabitech.test');
    }

    public function test_logout_invalida_el_token(): void
    {
        $token = $this->postJson('/api/login', [
            'email' => 'ana@sabitech.test',
            'password' => 'password',
        ])->json('token');

        $this->withToken($token)->postJson('/api/logout')->assertOk();

        $this->app['auth']->forgetGuards();

        $this->withToken($token)->getJson('/api/user')
            ->assertStatus(401)
            ->assertJsonPath('code', 'unauthenticated');
    }
}
