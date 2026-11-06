<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('talk_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['confirmed', 'cancelled'])->default('confirmed');
            $table->string('reference', 20)->unique();      // referencia única de la reserva
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();

            // Una sola reserva por usuario y charla
            $table->unique(['user_id', 'talk_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
