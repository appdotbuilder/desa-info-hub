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
        Schema::create('activity_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->constrained('activities')->onDelete('cascade');
            $table->string('filename')->comment('Original filename');
            $table->string('file_path')->comment('Path to stored file');
            $table->string('file_type')->comment('File type/extension');
            $table->integer('file_size')->comment('File size in bytes');
            $table->enum('document_type', ['photo', 'report', 'other'])->default('other')->comment('Type of document');
            $table->string('description')->nullable()->comment('Document description');
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('activity_id');
            $table->index('document_type');
            $table->index('uploaded_by');
            $table->index(['activity_id', 'document_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_documents');
    }
};