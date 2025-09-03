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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Activity title');
            $table->text('description')->nullable()->comment('Activity description');
            $table->dateTime('activity_date')->comment('Date and time of the activity');
            $table->string('location')->nullable()->comment('Activity location');
            $table->enum('status', ['planned', 'ongoing', 'completed', 'cancelled'])->default('planned')->comment('Activity status');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('title');
            $table->index('activity_date');
            $table->index('status');
            $table->index(['status', 'activity_date']);
            $table->index('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};