<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimoni', function (Blueprint $table) {
            $table->id();
            $table->string('name', 140);
            $table->string('role', 140)->nullable();
            $table->string('role_en', 140)->nullable();
            $table->string('origin', 140)->nullable();
            $table->string('avatar')->nullable();
            $table->text('message');
            $table->text('message_en')->nullable();
            $table->unsignedTinyInteger('rating')->default(5);
            $table->boolean('is_approved')->default(true)->index();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimoni');
    }
};
