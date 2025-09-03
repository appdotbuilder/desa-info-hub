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
        Schema::create('document_archives', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Document title');
            $table->text('description')->nullable()->comment('Document description');
            $table->string('filename')->comment('Original filename');
            $table->string('file_path')->comment('Path to stored file');
            $table->string('file_type')->comment('File type/extension');
            $table->integer('file_size')->comment('File size in bytes');
            $table->string('category')->nullable()->comment('Document category');
            $table->json('tags')->nullable()->comment('Document tags (JSON array)');
            $table->enum('visibility', ['public', 'members_only', 'admin_only'])->default('public')->comment('Document visibility level');
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->integer('download_count')->default(0)->comment('Number of times downloaded');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('title');
            $table->index('category');
            $table->index('visibility');
            $table->index('uploaded_by');
            $table->index(['category', 'visibility']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_archives');
    }
};