<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BudayaController;
use App\Http\Controllers\WisataController;
use App\Http\Controllers\KulinerController;
use App\Http\Controllers\UmkmController;
use App\Http\Controllers\HomestayController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\PageContentController;
use App\Http\Controllers\TestimoniController;
use App\Http\Controllers\ReservasiController;

Route::apiResource('wisata', WisataController::class)->only(['index', 'show']);
Route::apiResource('budaya', BudayaController::class)->only(['index', 'show']);
Route::apiResource('kuliner', KulinerController::class)->only(['index', 'show']);
Route::apiResource('umkm', UmkmController::class)->only(['index', 'show']);
Route::apiResource('homestay', HomestayController::class)->only(['index', 'show']);
Route::apiResource('berita', BeritaController::class)->only(['index', 'show']);
Route::get('page-content/{page}', [PageContentController::class, 'show']);
Route::get('testimoni', [TestimoniController::class, 'index']);
Route::post('reservasi', [ReservasiController::class, 'store'])->middleware('throttle:10,1');

use App\Http\Controllers\UploadController;

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user', [AuthController::class, 'me']);
    
    Route::post('/upload', [UploadController::class, 'upload']);

    Route::get('/stats', [DashboardController::class, 'stats']);
    Route::get('reservasi', [ReservasiController::class, 'index']);
    Route::apiResource('admin-users', AdminUserController::class);
    Route::apiResource('wisata', WisataController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('budaya', BudayaController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('kuliner', KulinerController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('umkm', UmkmController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('homestay', HomestayController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('berita', BeritaController::class)->only(['store', 'update', 'destroy']);
    Route::put('page-content/{page}', [PageContentController::class, 'update']);
    Route::post('testimoni', [TestimoniController::class, 'store']);
    Route::put('testimoni/{id}', [TestimoniController::class, 'update']);
    Route::delete('testimoni/{id}', [TestimoniController::class, 'destroy']);
});
