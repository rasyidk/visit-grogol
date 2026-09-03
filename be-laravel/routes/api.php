<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BudayaController;
use App\Http\Controllers\WisataController;

Route::apiResource('wisata', WisataController::class)->only(['index', 'show']);
Route::apiResource('budaya', BudayaController::class)->only(['index', 'show']);

use App\Http\Controllers\UploadController;

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user', [AuthController::class, 'me']);
    
    Route::post('/upload', [UploadController::class, 'upload']);

    Route::get('/stats', [DashboardController::class, 'stats']);
    Route::apiResource('admin-users', AdminUserController::class);
    Route::apiResource('wisata', WisataController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('budaya', BudayaController::class)->only(['store', 'update', 'destroy']);
});
