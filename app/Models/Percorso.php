<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Percorso extends Model
{
      protected $table ='percorsi';
/**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id', 'nome', 'partenza','arrivo'
  ];
  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
  ];
}
