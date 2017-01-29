<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSpeseSchedeVettureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spese_schede_vetture', function (Blueprint $table) {
            $table->increments('id');
        });

        Schema::table('spese_schede_vetture', function (Blueprint $table) {
            $table->string('nome');
           // $table->date('date_spesa');//giorno della spesa fatta, 
            $table->string('tipologia');// tipologia della spesa Rifornimento gasolio/ pagamento transito, ed altri tipi
            $table->decimal('spesa',5,2); //spesa del giorno
            $table->boolean('paga_ditta');//cuando e attivo, la ditta paga, seno, paga il conduttore
            $table->string('nota');//qui si metono i numeri degli scontrini, ed eventuali note

            $table->integer('detalle_scheda_vettura_id')->unsigned();
            $table->foreign('detalle_scheda_vettura_id')->references('id')->on('detalle_schede_vetture');
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
        Schema::drop('spese_schede_vetture');
    }
}
