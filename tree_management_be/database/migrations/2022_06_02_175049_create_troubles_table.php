<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTroublesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('troubles', function (Blueprint $table) {
            $table->id();
            $table->string("title")->nullable();
            $table->string("trouble_type")->nullable();
            $table->longText("description")->nullable();
            $table->string("image")->nullable();
//            $table->dateTime("")->nullable();
            $table->Integer('status')->nullable();
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
        Schema::dropIfExists('troubles');
    }
}
