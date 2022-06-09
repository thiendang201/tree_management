<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePestImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pest_images', function (Blueprint $table) {
            $table->id();
            $table->string("image")->nullable();
            $table->unsignedBigInteger("pest_id")->nullable();
            $table->timestamps();
            $table->foreign('pest_id')->references('id')->on('pest_statuses')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pest_images');
    }
}
