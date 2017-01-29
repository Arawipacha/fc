<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleSpesa extends Model
{
     protected $table ='spese_schede_vetture';
/**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id', 'nome', 'tipologia','spesa','paga_ditta','nota','detalle_scheda_vettura_id'
  ];
  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
  ];


    public function detalleSchedaVettura(){
    //belongTo  pertenece a una persona
        return $this->belongTo('App\Models\DetalleSchedaVettura');
    }
}
