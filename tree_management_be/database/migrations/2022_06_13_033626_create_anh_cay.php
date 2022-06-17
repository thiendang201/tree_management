<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnhCay extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('AnhCay', function (Blueprint $table) {
            $table->string("id");
            $table->primary(['id']);
            $table->string("hinhAnh")->nullable();
            $table->string("idCay")->nullable();
            $table->timestamps();
            $table->foreign('idCay')->references('id')->on('CayXanh');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('AnhCay');
    }
}
