<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetalleSpesa;
class DetalleSpesaController extends Controller
{
    public function showDetalleSpesa($id){
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
		$data->detalle_scheda_vettura=$detalle_scheda_vettura;
      //if($data){
		 
          return $this->crearRespuesta($data,200);
      //}
     }
      return $this->crearRespuesta('Detalle Scheda vettura non e stata trovata',404); 
    }
}
