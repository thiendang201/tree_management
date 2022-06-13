<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTinhTrangSauBenh extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TinhTrangSauBenh', function (Blueprint $table) {
            $table->id();
            $table->string("tenBenh")->nullable();
            $table->longText("moTa")->nullable();
            $table->date("ngayPhatBenh")->nullable();
            $table->date("ngayHet")->nullable();
            $table->unsignedBigInteger("idCay")->nullable();
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
        Schema::dropIfExists('TinhTrangSauBenh');
    }
}
