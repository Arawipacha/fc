<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleSchedaVettura extends Model
{
   protected $table ='detalle_schede_vetture';
   /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id', 'nro_gg', 'km_ini','km_fine','consegne','ritiri','lavorabile','scheda_vettura_id','dipendente_id'
  ];
  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
  ];
    public function schedaVettura(){
    //belongTo  pertenece a una persona
    return $this->belongTo('App\Models\SchedaVettura');
  }

    //tienes detalle scheda vetture
    public function detalleSpesa()
    {
        //return $this->hasMany(DetalleSchedaVettura::class);
        return $this->hasMany('App\Models\DetalleSpesa');
        
    }

}
