<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('homestays', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('title_en')->nullable();
            
            // New fields for homestay
            $table->string('price')->nullable();
            $table->text('facilities')->nullable(); // Can store comma separated strings
            
            $table->string('thumbnail')->nullable();
            $table->json('images')->nullable();
            
            $table->boolean('is_active')->default(true);
            $table->boolean('is_gallery_active')->default(true);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homestays');
    }
};
