<?php
use Illuminate\Support\Facades\Route;

// Serve React frontend
Route::get('/react/{path?}', function () {
    return file_get_contents(public_path('react/frontend/dist/index.html'));
})->where('path', '.*');

// Other Laravel routes go here
Route::get('/', function () {
    return view('welcome');
});
