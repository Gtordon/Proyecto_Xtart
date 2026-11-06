<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('talks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('speaker_id')->constrained('speakers');
            $table->dateTime('starts_at');
            $table->dateTime('ends_at');
            $table->string('room');
            $table->unsignedInteger('capacity');
            $table->timestamps();
        });

        // Reglas que protege la tabla: aforo positivo y la charla termina después de empezar
        DB::statement('ALTER TABLE talks ADD CONSTRAINT talks_capacity_positive CHECK (capacity > 0)');
        DB::statement('ALTER TABLE talks ADD CONSTRAINT talks_ends_after_start CHECK (ends_at > starts_at)');
    }

    public function down(): void
    {
        Schema::dropIfExists('talks');
    }
};
