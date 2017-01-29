<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

/*
Route::get('/', function () {
    
	return view('welcome');
});
*/
Route::get( '/', function () {
    return view( 'layouts.index' ); // - Aqui la ruta hacia la vista index que creamos
});


Route::get( '/{page}', function( $page ) {
    return view( 'layouts.index' );
})->where( 'page', '[^.]+' );
