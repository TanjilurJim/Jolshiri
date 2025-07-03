<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;

Route::middleware(['web', 'auth']) // you can add 'role:Super Admin' later
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {
        Route::resource('permissions', \App\Http\Controllers\Admin\PermissionController::class);
        Route::resource('roles', RoleController::class);

    });

