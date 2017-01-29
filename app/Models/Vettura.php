<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vettura extends Model
{
    protected $table ='vetture';
/**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id', 'nome', 'targa','marchio','tipologia'
  ];
  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
  ];
}
