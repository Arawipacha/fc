<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetalleSchedeVettureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_schede_vetture', function (Blueprint $table) {
            $table->increments('id');
        });

        Schema::table('detalle_schede_vetture', function (Blueprint $table) {
            $table->integer('nro_gg');//1, 2,...31  giorni del mese
            $table->integer('km_ini');//km inizio della giornata, 
            $table->integer('km_fine');//km fine della giornata
            $table->decimal('spesa',5,2);
            $table->integer('consegne'); //nro di consegne
            $table->integer('ritiri'); //nro di ritiri
            $table->boolean('lavorabile')->default('0');//giorno laborabile
                
            
            $table->timestamps();

            $table->integer('scheda_vettura_id')->unsigned();
            $table->foreign('scheda_vettura_id')->references('id')->on('schede_vetture');

            $table->integer('dipendente_id')->unsigned();
            $table->foreign('dipendente_id')->references('id')->on('dipendenti');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('detalle_schede_vetture');
    }
}
