<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Role;
use App\Models\Speaker;
use App\Models\Talk;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void{
        Role::create(['name' => Role::ATTENDEE, 'label' => 'Asistente']);
        Role::create(['name' => Role::ORGANIZER, 'label' => 'Organizador']);
        Role::create(['name' => Role::ACCESS_STAFF,'label' => 'Personal de Acceso']);

        Speaker::create(['name' => 'Laura Martin', 'bio' => 'Especialista en inteligencia artificial']);
        Speaker::create(['name' => 'Paco ibañez', 'bio' => 'Experto en cyberseguridad para las aplicaciones Web']);
        Speaker::create(['name' => 'Santiago García', 'bio' => 'Especialista en desarrollo de aplicaciones móviles']);

        //Usuarios: 2 asistentes, 1 organizador y 1 personal de acceso

        User::create([
            'name' => 'Ana Asistente',
            'email' => 'ana@sabitech.test',
            'password' => 'password',
            'role_id' => Role::where('name', Role::ATTENDEE)->first()->id,
        ]);

        User::create([
            'name' => 'Alex Asistente',
            'email' => 'alex@sabitech.test',
            'password' => 'password',
            'role_id' => Role::where('name', Role::ATTENDEE)->first()->id,
        ]);

        User::create([
            'name' => 'Oscar Organizador',
            'email' => 'organizacion@sabitech.test',
            'password' => 'password',
            'role_id' => Role::where('name', Role::ORGANIZER)->first()->id,
        ]);

        User::create([
            'name' => 'Andres Acceso',
            'email' => 'acceso@sabitech.test',
            'password' => 'password',
            'role_id' => Role::where('name', Role::ACCESS_STAFF)->first()->id,
        ]);

        //Charlas: Una con muchas plazas,una con 1 plaza libre y una completa

        $charlaMuchasplazas = Talk::create([
            'title' => 'Introduccion a la IA Generativa',
            'description' => 'Que son los modelos de lenguaje y que usos reales tienen en una empresa',
            'speaker_id' => Speaker::where('name', 'Laura Martin')->first()->id,
            'starts_at' => now()->addDays(7)->setTime(10, 0),
            'ends_at' => now()->addDays(7)->setTime(11, 0),
            'room' => 'Sala 1',
            'capacity' => 100,
        ]);

        $charlaUnaPlaza = Talk::create([
            'title' => 'Ciberseguridad en aplicaciones web',
            'description' => 'Como proteger tus aplicaciones web de ataques y vulnerabilidades',
            'speaker_id' => Speaker::where('name', 'Paco ibañez')->first()->id,
            'starts_at' => now()->addDays(7)->setTime(12, 0),
            'ends_at' => now()->addDays(7)->setTime(13, 0),
            'room' => 'Sala 2',
            'capacity' => 2,
        ]);

        $charlaCompleta = Talk::create([
            'title' => 'Desarrollo de aplicaciones moviles',
            'description' => 'Como crear aplicaciones móviles multiplataforma con Flutter',
            'speaker_id' => Speaker::where('name', 'Santiago García')->first()->id,
            'starts_at' => now()->addDays(7)->setTime(14, 0),
            'ends_at' => now()->addDays(7)->setTime(15, 0),
            'room' => 'Sala 3',
            'capacity' => 2,
        ]);

        //Reservas: Van despues de las charlas porque cada reserva a punta a una charla concreta

                $ana = User::where('email', 'ana@sabitech.test')->first();
        $alex = User::where('email', 'alex@sabitech.test')->first();

        // Charla con una plaza libre
        Reservation::create([
            'user_id' => $ana->id,
            'talk_id' => $charlaUnaPlaza->id,
            'status' => Reservation::STATUS_CONFIRMED,
            'reference' => 'RES-001',
        ]);

        // Charla completa
        Reservation::create([
            'user_id' => $alex->id,
            'talk_id' => $charlaCompleta->id,
            'status' => Reservation::STATUS_CONFIRMED,
            'reference' => 'RES-002',
        ]);

        Reservation::create([
            'user_id' => $ana->id,
            'talk_id' => $charlaCompleta->id,
            'status' => Reservation::STATUS_CONFIRMED,
            'reference' => 'RES-003',
        ]);
    }
}