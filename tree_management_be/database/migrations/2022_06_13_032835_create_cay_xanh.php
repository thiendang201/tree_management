<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCayXanh extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('CayXanh', function (Blueprint $table) {
            $table->string("id");
            $table->primary(['id']);
            $table->string("tenCay")->nullable();
            $table->string("viTri")->nullable();
            $table->date("ngayTrong")->nullable();
            $table->string("trangThai")->nullable();
            $table->string("idLoaiCay")->nullable();
            $table->timestamps();
            $table->foreign('idLoaiCay')->references('id')->on('LoaiCay');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('CayXanh');
    }
}
