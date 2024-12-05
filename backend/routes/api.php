<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NavController;
use App\Http\Controllers\JudgementController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TeamController;


Route::get('/nav-links', [NavController::class, 'index']); // Public route for fetching navigation links
Route::get('/judgements', [JudgementController::class, 'index']); // Public route for fetching judgments
Route::get('/judgements/show', [JudgementController::class, 'show']); // Fetch judgment by registration number


Route::get('/orders', [OrderController::class, 'viewOrders']);


Route::get('/teams', [TeamController::class, 'index']); // Fetch all teams
Route::get('/teams/{id}', [TeamController::class, 'show']); // Fetch single team by ID

Route::get('/gallery', [TeamController::class, 'gallery']);