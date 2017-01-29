<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Vettura;
class VetturaController extends Controller
{
    public function index(){
        $data=Vettura::all();
        return $this->crearRespuesta($data,200);
    }

    public function save(Request $request){
        $reglas=[
		      'nome'    		=> 'required',
		      'targa'    		=> 'required',
		      'marchio'    		=> 'required',
			  'tipologia'   	=> 'required',
		
		];
		
		$this->validate($request,$reglas);
		
		$input = $request->all();
		
		if(isset($input['id'])){
		      $vettura= Vettura::find($input['id']);
			 
		}

        if(isset($vettura)){
			$nome=$input['nome'];
			$targa=$input['targa'];
			$marchio=$input['marchio'];
			$tipologia=$input['tipologia'];
			$vettura->nome=$nome;
			$vettura->targa=$targa;
			$vettura->marchio=$marchio;
			$vettura->tipologia=$tipologia;
			
			
			$vettura->save();

            //return $this->crearRespuesta($data,200);
            return $this->crearRespuestaConData('I tuoi dati sono stati aggiornati.',$vettura,200);

        }
            $vettura=Vettura::create($input);

            return $this->crearRespuestaConData('Persona fue  registrato.',$vettura,200);
    }

}
