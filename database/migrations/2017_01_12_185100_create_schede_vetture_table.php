<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchedeVettureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('schede_vetture', function (Blueprint $table) {
            $table->increments('id');
        });

        Schema::table('schede_vetture', function (Blueprint $table) {
            $table->string('mese');
            $table->string('gg_totale')->nullable();//giorni totale
            $table->string('km_totale')->nullable(); // kilometri totale
            $table->string('spesa')->nullable(); // spese totale viaggio , tabella spesa
            $table->boolean('active')->default('0');

            $table->integer('percorso_id')->unsigned();
            $table->foreign('percorso_id')->references('id')->on('percorsi');

            $table->integer('vettura_id')->unsigned();
            $table->foreign('vettura_id')->references('id')->on('vetture');

            $table->integer('dipendente_id')->unsigned();
            $table->foreign('dipendente_id')->references('id')->on('dipendenti');

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
        Schema::drop('schede_vetture');
    }
}
