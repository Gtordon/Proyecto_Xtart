<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CharlasTest extends TestCase
{
    use RefreshDatabase;

    protected $seed = true;

    public function test_listado_de_charlas_es_publico_y_calcula_plazas_libres(): void
    {
        $response = $this->getJson('/api/talks');

        $response->assertOk()->assertJsonCount(3);

        $charlas = collect($response->json())->keyBy('title');

        $this->assertSame(100, $charlas['Introduccion a la IA Generativa']['available_seats']);
        $this->assertSame(1, $charlas['Ciberseguridad en aplicaciones web']['available_seats']);
        $this->assertSame(0, $charlas['Desarrollo de aplicaciones moviles']['available_seats']);
    }

    public function test_detalle_de_charla_existente(): void
    {
        $id = $this->getJson('/api/talks')->json('0.id');

        $this->getJson("/api/talks/{$id}")
            ->assertOk()
            ->assertJsonStructure(['id', 'title', 'speaker', 'starts_at', 'ends_at', 'room', 'capacity', 'available_seats']);
    }

    public function test_charla_inexistente_devuelve_404_en_json(): void
    {
        $this->getJson('/api/talks/99999')
            ->assertStatus(404)
            ->assertJsonPath('code', 'not_found');
    }

    public function test_la_hora_se_envia_en_hora_de_madrid(): void
    {
        $charla = collect($this->getJson('/api/talks')->json())
            ->firstWhere('title', 'Introduccion a la IA Generativa');

        $inicio = \Carbon\Carbon::parse($charla['starts_at'])->setTimezone('Europe/Madrid');

        $this->assertSame('10:00', $inicio->format('H:i'));
    }
}
