<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCongViec extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('CongViec', function (Blueprint $table) {
            $table->string("id");
            $table->primary(['id']);
            $table->string("tenCV")->nullable();
            $table->longText("moTaTienDo")->nullable();
            $table->date("ngayBatDau")->nullable();
            $table->date("ngayKetThuc")->nullable();
            $table->date("ngayHoanThanh")->nullable();
            $table->string("idKeHoach")->nullable();
            $table->timestamps();
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
        Schema::dropIfExists('CongViec');
    }
}
