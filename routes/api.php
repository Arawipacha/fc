<?php

use Illuminate\Http\Request;

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
/*
Header add Access-Control-Allow-Origin "*";
Header add Access-Control-Allow-Headers "origin, x-requested-with, content-type";
Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS";*/
//header('Access-Control-Allow-Origin: "*"');
//header('Access-Control-Allow-Methods: "PUT, GET, POST, DELETE, OPTIONS"');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

//rutas de la vettura
Route::get('/vetture','VetturaController@index'); /*visualiza elenco vetture*/
Route::get('/vetture/{id}','VetturaController@show');/*visualiza id vettura*/
Route::post('/vetture','VetturaController@save');/*salva una vettura*/


//rute dei percorsi
Route::get('/percorso','PercorsoController@index'); /*visualiza elenco vetture*/
Route::get('/percorso/{id}','PercorsoController@show');/*visualiza id pecorso*/
Route::post('/percorso','PercorsoController@store');/*salva una percorso*/

//rutas del dipendente
Route::get('/dipendente','DipendenteController@index');/*salva una dipendente*/
Route::post('/dipendente','DipendenteController@store');/*salva una dipendente*/
Route::get('/dipendente/{id}','DipendenteController@show');/*obtiene la datos del dipendente con el id*/
Route::get('/dipendentefullname','DipendenteController@getDipendenteData');/*obtiene la datos del dipendente con el id*/


//rutas scheda vettura 
Route::get('/schedavettura','SchedaVetturaController@index');/*obtiene datos  scheda vettura*/
Route::post('/schedavettura','SchedaVetturaController@store');/*obtiene datos  scheda vettura*/

Route::get('/schedavettura/detalle/{id}','SchedaVetturaController@showdDetalleScheda');/*obtiene datos detalle  scheda vettura*/
Route::post('/schedavettura/detalleschedavettura','SchedaVetturaController@storeDetalleSchedaVettura');
//salva detalle scheda vettura


Route::get('/schedavetturadatacombobox','SchedaVetturaController@showDataCombobox');/*obtiene datos para los combobox de scheda vettura*/


Route::get('/tecneco','TecnecoCrawler@getIndex');

