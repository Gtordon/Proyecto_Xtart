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
            $table->string('speaker');
            $table->dateTime('starts_at');
            $table->dateTime('ends_at');
            $table->string('room');
            $table->unsignedInteger('capacity');
            $table->timestamps();
        });

        // El aforo tiene que ser un número positivo
        DB::statement('ALTER TABLE talks ADD CONSTRAINT talks_capacity_positive CHECK (capacity > 0)');
    }

    public function down(): void
    {
        Schema::dropIfExists('talks');
    }
};
