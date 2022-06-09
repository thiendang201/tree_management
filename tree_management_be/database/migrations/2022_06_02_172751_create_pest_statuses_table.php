<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePestStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pest_statuses', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable();
            $table->longText("description")->nullable();
            $table->date("sicked_date");
            $table->date("cured_date");
            $table->unsignedBigInteger("tree_id")->nullable();
            $table->timestamps();
            $table->foreign('tree_id')->references('id')->on('trees')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pest_statuses');
    }
}
