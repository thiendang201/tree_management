<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTreeImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tree_images', function (Blueprint $table) {
            $table->id();
            $table->string("image")->nullable();
            $table->unsignedBigInteger("tree_id");
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
        Schema::dropIfExists('tree_images');
    }
}
