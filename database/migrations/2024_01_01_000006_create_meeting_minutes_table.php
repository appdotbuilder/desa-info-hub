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
        Schema::create('meeting_minutes', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Meeting title');
            $table->text('content')->comment('Meeting minutes content');
            $table->dateTime('meeting_date')->comment('Date and time of the meeting');
            $table->string('location')->nullable()->comment('Meeting location');
            $table->json('attendees')->nullable()->comment('List of attendees (JSON array)');
            $table->string('file_path')->nullable()->comment('Path to uploaded meeting minutes file');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->comment('Publication status');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamp('published_at')->nullable()->comment('When the minutes were published');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('title');
            $table->index('meeting_date');
            $table->index('status');
            $table->index('created_by');
            $table->index(['status', 'meeting_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meeting_minutes');
    }
};