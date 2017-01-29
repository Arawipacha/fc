<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Percorso;
class PercorsoController extends Controller
{
    ////rute dei percorsi
//Route::get('/percorso','PercorsoController@index'); /*visualiza elenco vetture*/
//Route::get('/percorso/{id}','PercorsoController@show');/*visualiza id pecorso*/
//Route::post('/percorso','PercorsoController@save');/*salva una percorso*/

    public function index(){
        $data=Percorso::all();
        return $this->crearRespuesta($data,200);
    }

    public function store(Request $request){
        $reglas=[
		      'nome'    		=> 'required',
		      'partenza'    		=> 'required',
		      'arrivo'     => 'required'
			  
              //'telefono'       	=> 'required',
		
		];
		
		$this->validate($request,$reglas);
		
		$input = $request->all();
		
		if(isset($input['id'])){
		      $percorso= Percorso::find($input['id']);
			 
		}

        if(isset($percorso)){
			$nome=$input['nome'];
			$partenza=$input['partenza'];
			$arrivo=$input['arrivo'];
			//$attive=$input['attive'];
            

			$percorso->nome=$nome;
			$percorso->partenza=$partenza;
			$percorso->arrivo=$arrivo;
			//$percorso->attive=$attive;
            
			$percorso->save();

            //return $this->crearRespuesta($data,200);
            return $this->crearRespuestaConData('I tuoi dati sono stati aggiornati.',$percorso,200);

        }
            $percorso=Percorso::create($input);

            return $this->crearRespuestaConData('Percorso stato registrato!',$percorso,200);
    }


    public function show($id){
    //$data= Menu::where('parent_id',$id_parent);
        $data= Percorso::find($id);
        if($data){
            
            return $this->crearRespuesta($data,200);
        }
        return $this->crearRespuesta('Percorso non trovato',404); 
    }

}
