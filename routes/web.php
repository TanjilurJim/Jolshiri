<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\RoleController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// dashboard route
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('civilianPlotRegistration', function () {
        return Inertia::render('civilianPlotRegistration');
    })->name('civilianPlotRegistration');
});

//role manager


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
