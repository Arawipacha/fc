<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Dipendente;
class DipendenteController extends Controller
{
    public function index(){
        $data=Dipendente::all();
        return $this->crearRespuesta($data,200);
    }

    public function store(Request $request){
        $reglas=[
		      'nome'    		=> 'required',
		      'cognome'    		=> 'required',
		      'cod_fiscale'     => 'required',
			  'indirizzo'   	=> 'required'
              //'telefono'       	=> 'required',
		
		];
		
		$this->validate($request,$reglas);
		
		$input = $request->all();
		
		if(isset($input['id'])){
		      $dipendente= Dipendente::find($input['id']);
			 
		}

        if(isset($dipendente)){
			$nome=$input['nome'];
			$cognome=$input['cognome'];
			$indirizzo=$input['indirizzo'];
			$cod_fiscale=$input['cod_fiscale'];
            $telefono=$input['telefono'];

			$dipendente->nome=$nome;
			$dipendente->cognome=$cognome;
			$dipendente->indirizzo=$indirizzo;
			$dipendente->cod_fiscale=$cod_fiscale;
            $dipendente->telefono=$telefono;

			
			
			$dipendente->save();

            //return $this->crearRespuesta($data,200);
            return $this->crearRespuestaConData('I tuoi dati sono stati aggiornati.',$dipendente,200);

        }
            $dipendente=Dipendente::create($input);

            return $this->crearRespuestaConData('Dipendente stato registrato!',$dipendente,200);
    }


public function show($id){
  //$data= Menu::where('parent_id',$id_parent);
      $data= Dipendente::find($id);
      if($data){
		 
          return $this->crearRespuesta($data,200);
      }
      return $this->crearRespuesta('Dipendente non trovato',404); 

}

    public function getDipendenteData(){
        $data = Dipendente::select(
            'id',
            DB::raw("CONCAT(dipendenti.nome, ' ', dipendenti.cognome) AS full_name"))
            ->get();
            
            return $this->crearRespuesta($data,200);
    }

}
