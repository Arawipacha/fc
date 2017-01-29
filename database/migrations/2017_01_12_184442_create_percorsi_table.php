<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePercorsiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('percorsi', function (Blueprint $table) {
            $table->increments('id');
        });

        Schema::table('percorsi', function (Blueprint $table) {
            $table->string('nome');//nome del percorso
            $table->string('partenza');//punto partenza  della vettura
            $table->string('arrivo'); //punto partenza della vettura
            
            $table->boolean('active')->default('0');//stato del percorso e attivo
            
            $table->timestamps();

            //$table->integer('vettura_id')->unsigned();
            //$table->foreign('vettura_id')->references('id')->on('vetture');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('percorsi');
    }
}
