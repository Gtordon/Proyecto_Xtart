<?php

namespace Tests\Feature;

use App\Models\Reservation;
use App\Models\Talk;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReservasTest extends TestCase
{
    use RefreshDatabase;

    protected $seed = true;

    private function tokenDe(string $email): string
    {
        return User::where('email', $email)->firstOrFail()->issueToken();
    }

    private function charla(string $titulo): Talk
    {
        return Talk::where('title', $titulo)->firstOrFail();
    }

    public function test_asistente_reserva_una_plaza(): void
    {
        $charla = $this->charla('Introduccion a la IA Generativa');

        $this->withToken($this->tokenDe('ana@sabitech.test'))
            ->postJson("/api/talks/{$charla->id}/reservations")
            ->assertCreated()
            ->assertJsonPath('talk_id', $charla->id)
            ->assertJsonPath('status', 'confirmed');

        $this->assertDatabaseHas('reservations', [
            'talk_id' => $charla->id,
            'status' => 'confirmed',
        ]);
    }

    public function test_no_se_puede_reservar_dos_veces_la_misma_charla(): void
    {
        $charla = $this->charla('Introduccion a la IA Generativa');
        $token = $this->tokenDe('ana@sabitech.test');

        $this->withToken($token)->postJson("/api/talks/{$charla->id}/reservations")->assertCreated();

        $this->withToken($token)->postJson("/api/talks/{$charla->id}/reservations")
            ->assertStatus(409)
            ->assertJsonPath('code', 'already_reserved');
    }

    public function test_no_se_puede_reservar_una_charla_completa(): void
    {
        $charla = $this->charla('Desarrollo de aplicaciones moviles');

        $this->withToken($this->tokenDe('carla@sabitech.test'))
            ->postJson("/api/talks/{$charla->id}/reservations")
            ->assertStatus(409)
            ->assertJsonPath('code', 'talk_full');
    }

    public function test_la_ultima_plaza_se_puede_reservar_y_despues_queda_completa(): void
    {
        $charla = $this->charla('Ciberseguridad en aplicaciones web');

        $this->withToken($this->tokenDe('carla@sabitech.test'))
            ->postJson("/api/talks/{$charla->id}/reservations")
            ->assertCreated();

        $this->withToken($this->tokenDe('alex@sabitech.test'))
            ->postJson("/api/talks/{$charla->id}/reservations")
            ->assertStatus(409)
            ->assertJsonPath('code', 'talk_full');
    }

    public function test_no_se_puede_reservar_una_charla_que_ya_ha_empezado(): void
    {
        $charla = $this->charla('Introduccion a la IA Generativa');
        $charla->update(['starts_at' => now()->subHour(), 'ends_at' => now()->addHour()]);

        $this->withToken($this->tokenDe('carla@sabitech.test'))
            ->postJson("/api/talks/{$charla->id}/reservations")
            ->assertStatus(409)
            ->assertJsonPath('code', 'talk_started');
    }

    public function test_reservar_una_charla_inexistente_devuelve_404(): void
    {
        $this->withToken($this->tokenDe('carla@sabitech.test'))
            ->postJson('/api/talks/99999/reservations')
            ->assertStatus(404)
            ->assertJsonPath('code', 'talk_not_found');
    }

    public function test_solo_los_asistentes_pueden_reservar(): void
    {
        $charla = $this->charla('Introduccion a la IA Generativa');

        $this->withToken($this->tokenDe('organizacion@sabitech.test'))
            ->postJson("/api/talks/{$charla->id}/reservations")
            ->assertStatus(403)
            ->assertJsonPath('code', 'forbidden_role');
    }

    public function test_reservar_sin_sesion_devuelve_401(): void
    {
        $charla = $this->charla('Introduccion a la IA Generativa');

        $this->postJson("/api/talks/{$charla->id}/reservations")
            ->assertStatus(401)
            ->assertJsonPath('code', 'unauthenticated');
    }

    public function test_una_reserva_cancelada_se_puede_reactivar(): void
    {
        $ana = User::where('email', 'ana@sabitech.test')->firstOrFail();
        $charla = $this->charla('Ciberseguridad en aplicaciones web');

        $reserva = Reservation::where('user_id', $ana->id)->where('talk_id', $charla->id)->firstOrFail();
        $reserva->update(['status' => Reservation::STATUS_CANCELLED, 'cancelled_at' => now()]);

        $this->withToken($ana->issueToken())
            ->postJson("/api/talks/{$charla->id}/reservations")
            ->assertCreated()
            ->assertJsonPath('id', $reserva->id);

        $this->assertDatabaseHas('reservations', [
            'id' => $reserva->id,
            'status' => 'confirmed',
            'cancelled_at' => null,
        ]);
    }

    public function test_mis_reservas_solo_muestra_las_del_usuario(): void
    {
        $response = $this->withToken($this->tokenDe('ana@sabitech.test'))
            ->getJson('/api/reservations');

        $response->assertOk()->assertJsonCount(2);

        $this->withToken($this->tokenDe('carla@sabitech.test'))
            ->getJson('/api/reservations')
            ->assertOk()
            ->assertJsonCount(0);
    }
}
