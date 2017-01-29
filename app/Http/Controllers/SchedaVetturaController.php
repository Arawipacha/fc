<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Vettura;
use App\Models\Percorso;
use App\Models\Dipendente;
use App\Models\SchedaVettura;
use App\Models\DetalleSchedaVettura;
use App\Models\DetalleSpesa;

class SchedaVetturaController extends Controller
{

        public function index(){
            $data=SchedaVettura::all();
            return $this->crearRespuesta($data,200);
        }


//funzione dove si registra e aggiorna i datti iniziali della scheda vettura
 public function store(Request $request){
        $reglas=[
		      'dipendente_id'  		=> 'required',
		      'vettura_id'      	=> 'required',
		      'percorso_id'         => 'required',
              'mese'                => 'required'
		];
		
		$this->validate($request,$reglas);
		
		$input = $request->all();
		
		if(isset($input['id'])){
		      $model= SchedaVettura::find($input['id']);
			 
		}

        if(isset($model)){
			$dipendente_id=$input['dipendente_id'];
			$vettura_id=$input['vettura_id'];
			$percorso_id=$input['percorso_id'];
			$mese=$input['mese'];
            

			$model->dipendente_id=$dipendente_id;
			$model->vettura_id=$vettura_id;
			$model->percorso_id=$percorso_id;
			$model->mese=$mese;
            
			$model->save();

            //return $this->crearRespuesta($data,200);
            return $this->crearRespuestaConData('I tuoi dati sono stati aggiornati.',$model,200);

        }
            $model=SchedaVettura::create($input);

            return $this->crearRespuestaConData('Scheda Vettura stato registrato!',$model,200);
    }

    public function showDataCombobox(){
        //schedavetturadatacombobox
        $data=[
            'vettura'=> Vettura::select('id',DB::raw("CONCAT(targa, ' - ', nome) AS targa"))->get(),
            'percorso' =>Percorso::select('id','nome')->get(),
            'dipendente' =>Dipendente::select('id','nome',DB::raw("CONCAT(nome, ' ', cognome) AS fullname"))->get()
        ];
/*
$data= Ubigeo::select( 'id_ubigeo', 'nombre_ubigeo', 
      'codigo_ubigeo','etiqueta_ubigeo',
      'buscador_ubigeo','numero_hijos_ubigeo',
      'nivel_ubigeo','id_padre_ubigeo')->where('id_padre_ubigeo',$id)->get();
*/
        //$data->vettura=Vettura::all();
        //$data->percorso=Percorso::all();
        //$data->dipendente=Dipendente::all();
        return $this->crearRespuesta($data,200);
    }


    public function showdDetalleScheda($id){
         //$data= Menu::where('parent_id',$id_parent);
      //$data= SchedaVettura::find($id);
      //$data= SchedaVettura::select($id);
    $data = SchedaVettura::select(
    'schede_vetture.id',
    'mese',
    'gg_totale',
    'km_totale',
    'spesa',
    'percorso_id',
    'vettura_id',
    'dipendente_id',
    DB::raw("CONCAT(dipendenti.nome, ' ', dipendenti.cognome) AS fullname_dipendente"),
    DB::raw("percorsi.nome AS nome_percorso"),
    DB::raw("CONCAT(vetture.targa, ' - ', vetture.nome) AS nome_vettura"))
	->join('percorsi', 'schede_vetture.percorso_id', '=', 'percorsi.id')
	->join('vetture', 'schede_vetture.vettura_id', '=', 'vetture.id')
	->join('dipendenti', 'schede_vetture.dipendente_id', '=', 'dipendenti.id')
	->where('schede_vetture.id',$id )
	->first();

    //where('id_padre_ubigeo',$id)->get();




      if($data){
        //$detalle_scheda_vettura=DetalleSchedaVettura::find($data->id);
        $detalle_scheda_vettura=$data->detalleSchedaVettura()->
        select('consegne','dipendente_id','detalle_schede_vetture.id','km_ini','km_fine','lavorabile','nro_gg','ritiri','scheda_vettura_id',
        DB::raw("CONCAT(dipendenti.nome, ' ', dipendenti.cognome) AS fullname_dipendente"))
        ->join('dipendenti','detalle_schede_vetture.dipendente_id','=','dipendenti.id')->where('detalle_schede_vetture.scheda_vettura_id',$id)
        ->get();
		
        if($detalle_scheda_vettura){
            //$detalle_spesa=$data->detalle_scheda_vettura->detalleSpesa()->get();
            $x=0;
            /*foreach ($data->detalle_scheda_vettura as $key) {
                $data->detalle_scheda_vettura[$x]->detalle_spesa=['detalle_spesa'=> DetalleSpesa::find($key->id)];
                $x++;
            }*/
             foreach ($detalle_scheda_vettura as $key) {
                $detalle_scheda_vettura[$x]->detalle_spesa= DetalleSpesa::select('*')->where('detalle_scheda_vettura_id',$detalle_scheda_vettura[$x]->id)->get();
                if($detalle_scheda_vettura[$x]->detalle_spesa==null){
                    $detalle_scheda_vettura[$x]->detalle_spesa=array();
    
                }
                $x++;
            }
            $data->detalle_scheda_vettura=$detalle_scheda_vettura;
               /* $x=0;
                 while ($data->detalle_scheda_vettura > $x) {
                    $data=Ubigeo::where('id_ubigeo',$data[0]->id_padre_ubigeo)->get();
                    $nombre_ubigeo=$data[0]->nombre_ubigeo .',' . $nombre_ubigeo;
                    $codigo_ubigeo=trim($data[0]->codigo_ubigeo). ' ' . $codigo_ubigeo;
                    }
                    
            */
            //$data->SpesaSchedaDetalle
        }
      //if($data){
		 
          return $this->crearRespuesta($data,200);
      //}
     }
      return $this->crearRespuesta('Detalle Scheda vettura non e stata trovata',404); 
    }


/*
funcion che registra e aggiorna il detalle scheda vettura
*/
    public function storeDetalleSchedaVettura(Request $request){
        $reglas=[
              'scheda_vettura_id'   => 'required',
		      'nro_gg'        		=> 'required',
		      'km_ini'            	=> 'required',
		      'km_fine'             => 'required'
		];
		
		$this->validate($request,$reglas);
		
		$input = $request->all();
		
		if(isset($input['id'])){
		      $model= DetalleSchedaVettura::find($input['id']);
			 
		}

        if(isset($model)){
			$scheda_vettura_id=$input['scheda_vettura_id'];
            $nro_gg=$input['nro_gg'];
			$km_ini=$input['km_ini'];
			$km_fine=$input['km_fine'];
			//$km_totale=$input['km_totale'];
            // campo calcolato

            $consegne=$input['consegne'];
            $ritiri=$input['ritiri'];
            //$spesa=$input['spesa'];  campo calcolato
            $lavorabile=$input['lavorabile'];
            $dipendente_id=$input['dipendente_id'];
            /// manca ancora questo kjbnafkljabnsdlfksadnln
            

			$model->dipendente_id=$dipendente_id;
            $model->scheda_vettura_id=$scheda_vettura_id;
            $model->nro_gg=$nro_gg;
            $model->km_ini=$km_ini;
            $model->km_fine=$km_fine;
            $model->consegne=$consegne;
            $model->lavorabile=$lavorabile;
            $model->ritiri=$ritiri;
			//$model->vettura_id=$vettura_id;
			//$model->percorso_id=$percorso_id;
			//$model->mese=$mese;
            
			$model->save();

            //return $this->crearRespuesta($data,200);
            return $this->crearRespuestaConData('I tuoi dati sono stati aggiornati.',$model,200);

        }
            $model=DetalleSchedaVettura::create($input);

            return $this->crearRespuestaConData('Scheda Vettura stato registrato!',$model,200);
    }

}
