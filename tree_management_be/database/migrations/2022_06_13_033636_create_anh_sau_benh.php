<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnhSauBenh extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('AnhSauBenh', function (Blueprint $table) {
            $table->id();
            $table->string("hinhAnh")->nullable();
            $table->unsignedBigInteger("idSauBenh")->nullable();
            $table->timestamps();
            $table->foreign('idSauBenh')->references('id')->on('TinhTrangSauBenh');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('AnhSauBenh');
    }
}
