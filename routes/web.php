<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DocumentArchiveController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MeetingMinuteController;
use App\Http\Controllers\OrganizationProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - accessible to all
Route::get('/', [HomeController::class, 'index'])->name('home');

// Organization profile - public read, admin edit
Route::get('/organization', [OrganizationProfileController::class, 'show'])->name('organization.show');
Route::middleware(['auth'])->group(function () {
    Route::get('/organization/edit', [OrganizationProfileController::class, 'edit'])->name('organization.edit');
    Route::put('/organization', [OrganizationProfileController::class, 'update'])->name('organization.update');
});

// Public routes (accessible to all)
Route::resource('activities', ActivityController::class)->only(['index', 'show']);
Route::resource('meeting-minutes', MeetingMinuteController::class)->only(['index', 'show']);
Route::resource('documents', DocumentArchiveController::class)->only(['index', 'show']);

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Content management routes (for admins and content creators)
    Route::resource('activities', ActivityController::class)->except(['index', 'show']);
    Route::resource('meeting-minutes', MeetingMinuteController::class)->except(['index', 'show']);
    Route::resource('documents', DocumentArchiveController::class)->except(['index', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
