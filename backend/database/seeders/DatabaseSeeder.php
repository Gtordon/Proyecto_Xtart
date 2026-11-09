<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Speaker;
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
            'email' => 'oranizacion@sabitech.test',
            'password' => 'password',
            'role_id' => Role::where('name', Role::ORGANIZER)->first()->id,
        ]);

        User::create([
            'name' => 'Andres Acceso',
            'email' => 'acceso@sabitech.test',
            'password' => 'password',
            'role_id' => Role::where('name', Role::ACCESS_STAFF)->first()->id,
        ]);
    }
}
