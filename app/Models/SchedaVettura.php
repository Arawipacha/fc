<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchedaVettura extends Model
{
       protected $table ='schede_vetture';
   /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id', 'mese', 'gg_totale','km_totale','spesa','active','percorso_id','vettura_id','dipendente_id'
  ];
  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
  ];

    //tienes detalle scheda vetture
    public function detalleSchedaVettura()
    {
        //return $this->hasMany(DetalleSchedaVettura::class);
        return $this->hasMany('App\Models\DetalleSchedaVettura');
        
    }

}
