<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Role;
use App\Models\Speaker;
use App\Models\Talk;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Roles necesarios para la aplicación; firstOrCreate evita duplicarlos.
        Role::firstOrCreate(
            ['name' => Role::ATTENDEE],
            ['label' => 'Asistente']
        );
        Role::firstOrCreate(
            ['name' => Role::ORGANIZER],
            ['label' => 'Organizador']
        );
        Role::firstOrCreate(
            ['name' => Role::ACCESS_STAFF],
            ['label' => 'Personal de Acceso']
        );

        // Los siguientes registros son solo datos de prueba.
        if (! app()->environment('local', 'testing')) {
            return;
        }

        // Ponentes de las charlas de ejemplo.
        $attendeeRole = Role::where('name', Role::ATTENDEE)->firstOrFail();
        $organizerRole = Role::where('name', Role::ORGANIZER)->firstOrFail();
        $accessStaffRole = Role::where('name', Role::ACCESS_STAFF)->firstOrFail();

        $laura = Speaker::firstOrCreate(
            ['name' => 'Laura Martin'],
            ['bio' => 'Especialista en inteligencia artificial']
        );
        $paco = Speaker::firstOrCreate(
            ['name' => 'Paco ibañez'],
            ['bio' => 'Experto en cyberseguridad para las aplicaciones Web']
        );
        $santiago = Speaker::firstOrCreate(
            ['name' => 'Santiago García'],
            ['bio' => 'Especialista en desarrollo de aplicaciones móviles']
        );

        // Usuarios de prueba: dos asistentes, un organizador y personal de acceso.
        $ana = User::firstOrCreate(
            ['email' => 'ana@sabitech.test'],
            [
                'name' => 'Ana Asistente',
                'password' => 'password',
                'role_id' => $attendeeRole->id,
            ]
        );
        $alex = User::firstOrCreate(
            ['email' => 'alex@sabitech.test'],
            [
                'name' => 'Alex Asistente',
                'password' => 'password',
                'role_id' => $attendeeRole->id,
            ]
        );
        User::firstOrCreate(
            ['email' => 'organizacion@sabitech.test'],
            [
                'name' => 'Oscar Organizador',
                'password' => 'password',
                'role_id' => $organizerRole->id,
            ]
        );
        User::firstOrCreate(
            ['email' => 'acceso@sabitech.test'],
            [
                'name' => 'Andres Acceso',
                'password' => 'password',
                'role_id' => $accessStaffRole->id,
            ]
        );

        // Charlas de ejemplo: una con muchas plazas, otra casi completa y una completa.
        // Se usa el título para encontrar cada charla y actualizarla al repetir el seeder.
        Talk::updateOrCreate(
            ['title' => 'Introduccion a la IA Generativa'],
            [
                'description' => 'Que son los modelos de lenguaje y que usos reales tienen en una empresa',
                'speaker_id' => $laura->id,
                'starts_at' => now()->addDays(7)->setTime(10, 0),
                'ends_at' => now()->addDays(7)->setTime(11, 0),
                'room' => 'Sala 1',
                'capacity' => 100,
            ]
        );
        $charlaUnaPlaza = Talk::updateOrCreate(
            ['title' => 'Ciberseguridad en aplicaciones web'],
            [
                'description' => 'Como proteger tus aplicaciones web de ataques y vulnerabilidades',
                'speaker_id' => $paco->id,
                'starts_at' => now()->addDays(7)->setTime(12, 0),
                'ends_at' => now()->addDays(7)->setTime(13, 0),
                'room' => 'Sala 2',
                'capacity' => 2,
            ]
        );
        $charlaCompleta = Talk::updateOrCreate(
            ['title' => 'Desarrollo de aplicaciones moviles'],
            [
                'description' => 'Como crear aplicaciones móviles multiplataforma con Flutter',
                'speaker_id' => $santiago->id,
                'starts_at' => now()->addDays(7)->setTime(14, 0),
                'ends_at' => now()->addDays(7)->setTime(15, 0),
                'room' => 'Sala 3',
                'capacity' => 2,
            ]
        );

        // Reservas de ejemplo; el usuario y la charla identifican cada reserva.
        Reservation::updateOrCreate(
            ['user_id' => $ana->id, 'talk_id' => $charlaUnaPlaza->id],
            ['status' => Reservation::STATUS_CONFIRMED, 'reference' => 'RES-001']
        );
        Reservation::updateOrCreate(
            ['user_id' => $alex->id, 'talk_id' => $charlaCompleta->id],
            ['status' => Reservation::STATUS_CONFIRMED, 'reference' => 'RES-002']
        );
        Reservation::updateOrCreate(
            ['user_id' => $ana->id, 'talk_id' => $charlaCompleta->id],
            ['status' => Reservation::STATUS_CONFIRMED, 'reference' => 'RES-003']
        );
    }
}
