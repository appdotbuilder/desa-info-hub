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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'content_creator', 'member'])->default('member')->after('email_verified_at')->comment('User role in the organization');
            $table->boolean('is_active')->default(true)->after('role')->comment('Whether the user is active');
            $table->timestamp('last_login_at')->nullable()->after('is_active')->comment('Last login timestamp');
            
            // Indexes for performance
            $table->index('role');
            $table->index(['role', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['users_role_index']);
            $table->dropIndex(['users_role_is_active_index']);
            $table->dropColumn(['role', 'is_active', 'last_login_at']);
        });
    }
};