<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKeHoach extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('KeHoach', function (Blueprint $table) {
            $table->string("id");
            $table->primary(['id']);
            $table->string("tenKeHoach")->nullable();
            $table->longText("moTa")->nullable();
            $table->string("diaDiem")->nullable();
            $table->date("ngayBatDau")->nullable();
            $table->date("ngayKetThuc")->nullable();
            $table->integer("doUuTien")->nullable();
            $table->string("idNVPhuTrach")->nullable();
            $table->string("trangThai")->nullable();
            $table->timestamps();
            $table->foreign('idNVPhuTrach')->references('id')->on('NhanVien');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('KeHoach');
    }
}
