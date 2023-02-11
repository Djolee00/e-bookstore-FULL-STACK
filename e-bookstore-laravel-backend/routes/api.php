<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('users', UserController::class);

Route::resource('data', UserDataController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

Route::resource('orders', OrderController::class);
Route::resource('items', OrderItemController::class);
Route::resource('orders.items', ItemsByOrderController::class)->only('index');

Route::resource('authors', AuthorController::class);
Route::resource('categories', CategoryController::class);

Route::resource('books', BookController::class)->only(['index', 'show']);;
Route::resource('authors.books', AuthorBookController::class)->only('index');
Route::resource('categories.books', CategoryBookController::class)->only('index');

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    Route::group(['middleware' => ['admin']], function () {
    });

    Route::resource('books', BookController::class)->only(['update', 'store', 'destroy'])->middleware('admin');

    Route::resource('authors', AuthorController::class)->only(['update', 'store', 'destroy'])->middleware('admin');

    Route::resource('favbooks', FavBookController::class)->only(['index', 'show', 'store', 'destroy']);

    Route::resource('orders', OrderController::class)->only('index')->middleware('admin');;

    Route::put('/update-user', [AuthController::class, 'update']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
