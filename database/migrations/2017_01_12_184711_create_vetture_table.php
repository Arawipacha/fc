<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVettureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vetture', function (Blueprint $table) {
            $table->increments('id');
        });
        Schema::table('vetture', function (Blueprint $table) {
            $table->string('nome');// IVECO DAILY IV 2006 KW 110
            $table->string('targa')->unique();//CL678HD
            $table->string('marchio');//MARCHIO/MODELLO   IVECO-75E14
            $table->string('tipologia');//AUTOCARRO

            //$table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('vetture');
    }
}
