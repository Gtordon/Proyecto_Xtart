<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\Speaker;
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
        
    }
}
