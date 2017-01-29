<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDipendentiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dipendenti', function (Blueprint $table) {
            $table->increments('id');
        });
        Schema::table('dipendenti', function (Blueprint $table) {
            // $table->increments('id');
            //$table->string('id_contrato');
            //$table->string('p_iva')->unique();
            //$table->string('cod_fiscale')->unique();
            $table->string('nome');//nome del dipendenti
            $table->string('cognome');//cognome del dipendenti
            $table->string('indirizzo');//indirizzo abitazione 
            $table->string('cod_fiscale'); //codice fiscale
            $table->string('telefono'); //telefono

            //$table->string('data_ini'); //data inizio asunzione
            //$table->string('data_fine'); //data fine asunzione
            //$table->boolean('ative');//no lavora o inabilita diendenti
            $table->string('obs')->nullable();//osservazioni del dipendenti
            
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
        Schema::drop('dipendenti');
    }
}
