<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKeHoachCayXanh extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('KeHoachCayXanh', function (Blueprint $table) {
            $table->unsignedBigInteger("idCay");
            $table->unsignedBigInteger("idKeHoach");
            $table->timestamps();
            $table->primary(['idCay', 'idKeHoach']);
            $table->foreign('idCay')->references('id')->on('CayXanh');
            $table->foreign('idKeHoach')->references('id')->on('KeHoach');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('KeHoachCayXanh');
    }
}
