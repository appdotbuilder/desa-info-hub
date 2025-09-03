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
        Schema::create('organization_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Organization name');
            $table->text('vision')->nullable()->comment('Organization vision statement');
            $table->text('mission')->nullable()->comment('Organization mission statement');
            $table->string('email')->nullable()->comment('Contact email');
            $table->string('phone')->nullable()->comment('Contact phone number');
            $table->text('address')->nullable()->comment('Organization address');
            $table->text('description')->nullable()->comment('General description');
            $table->string('logo_path')->nullable()->comment('Path to logo file');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_profiles');
    }
};