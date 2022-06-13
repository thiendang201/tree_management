<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoaiCay extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('LoaiCay', function (Blueprint $table) {
            $table->id();
            $table->string("tenLoaiCay")->nullable();
            $table->string("loaiRe")->nullable();
            $table->string("loaiThan")->nullable();
            $table->string("loaiLa")->nullable();
            $table->longText("moTa")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('LoaiCay');
    }
}
